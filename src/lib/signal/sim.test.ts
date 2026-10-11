import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { EVIDENCE, INQUIRIES, SITES } from "./content.ts";
import { evaluate, hasWarrant, weigh } from "./evaluate.ts";
import {
  createInitialState,
  DESK_MINUTES,
  reduce,
  replay,
  type Action,
} from "./sim.ts";

const strongPath: Action[] = [
  { type: "begin" },
  { type: "inspect", siteId: "powerhouse" },
  { type: "inspect", siteId: "berth7" },
  { type: "inspect", siteId: "workshop" },
  { type: "inquire", inquiryId: "breaker-log" },
  { type: "inquire", inquiryId: "sensor-dump" },
  { type: "inquire", inquiryId: "work-order" },
  { type: "working", hypothesisId: "isolation" },
  { type: "alternative", hypothesisId: "sabotage" },
  { type: "submit", confidence: "moderate" },
];

describe("silent harbor simulation", () => {
  it("starts at the briefing with the full desk and no records", () => {
    const state = createInitialState();
    assert.equal(state.phase, "briefing");
    assert.equal(state.minutesLeft, DESK_MINUTES);
    assert.deepEqual(state.inquiries, []);
    assert.equal(state.working, null);
  });

  it("does not mutate the previous state", () => {
    const initial = createInitialState();
    const next = reduce(initial, { type: "begin" }).state;
    assert.notEqual(initial, next);
    assert.equal(initial.phase, "briefing");
    assert.equal(next.phase, "investigating");
  });

  it("charges a record once and refuses a second pull", () => {
    const opened = replay([
      { type: "begin" },
      { type: "inspect", siteId: "powerhouse" },
    ]);
    const first = reduce(opened, { type: "inquire", inquiryId: "breaker-log" });
    const second = reduce(first.state, { type: "inquire", inquiryId: "breaker-log" });
    assert.equal(first.state.minutesLeft, DESK_MINUTES - 30);
    assert.equal(second.state, first.state);
    assert.match(second.message, /already in the file/);
  });

  it("refuses a record when the location was never framed", () => {
    const opened = replay([{ type: "begin" }]);
    const step = reduce(opened, { type: "inquire", inquiryId: "breaker-log" });
    assert.equal(step.state, opened);
    assert.match(step.message, /Frame the location/);
  });

  it("refuses a record that does not fit the remaining time and leaves state unchanged", () => {
    const low = replay([
      { type: "begin" },
      { type: "inspect", siteId: "tower" },
      { type: "inspect", siteId: "powerhouse" },
      { type: "inspect", siteId: "berth7" },
      { type: "inspect", siteId: "workshop" },
      { type: "inspect", siteId: "kestrel" },
      { type: "inquire", inquiryId: "scada-origin" },
      { type: "inquire", inquiryId: "breaker-log" },
      { type: "inquire", inquiryId: "sensor-dump" },
      { type: "inquire", inquiryId: "work-order" },
    ]);
    assert.equal(low.minutesLeft, DESK_MINUTES - 30 - 30 - 25 - 25);
    const blocked = reduce(low, { type: "inquire", inquiryId: "ais-track" });
    assert.equal(blocked.state, low);
    assert.match(blocked.message, /needs 25 minutes/);
  });

  it("requires two different readings before filing", () => {
    const base = replay([
      { type: "begin" },
      { type: "working", hypothesisId: "isolation" },
    ]);
    const same = reduce(base, { type: "alternative", hypothesisId: "isolation" });
    assert.equal(same.state, base);
    const filed = reduce(base, { type: "submit", confidence: "high" });
    assert.equal(filed.state.phase, "investigating");
    const ready = reduce(base, { type: "alternative", hypothesisId: "failure" }).state;
    const done = reduce(ready, { type: "submit", confidence: "low" });
    assert.equal(done.state.phase, "debrief");
    assert.equal(done.state.confidence, "low");
  });

  it("is deterministic for the same action sequence", () => {
    assert.deepEqual(replay(strongPath), replay(strongPath));
    assert.deepEqual(evaluate(replay(strongPath)), evaluate(replay(strongPath)));
  });

  it("reaches the same warrant if the pivotal records are pulled in either order", () => {
    const sensorFirst = replay([
      { type: "begin" },
      { type: "inspect", siteId: "berth7" },
      { type: "inspect", siteId: "powerhouse" },
      { type: "inquire", inquiryId: "sensor-dump" },
      { type: "inquire", inquiryId: "breaker-log" },
    ]);
    const breakerFirst = replay([
      { type: "begin" },
      { type: "inspect", siteId: "powerhouse" },
      { type: "inspect", siteId: "berth7" },
      { type: "inquire", inquiryId: "breaker-log" },
      { type: "inquire", inquiryId: "sensor-dump" },
    ]);
    assert.equal(sensorFirst.minutesLeft, breakerFirst.minutesLeft);
    assert.equal(hasWarrant(sensorFirst), true);
    assert.equal(hasWarrant(breakerFirst), true);
    assert.deepEqual(sensorFirst.inquiries.slice().sort(), breakerFirst.inquiries.slice().sort());
  });

  it("grades a warranted isolation as sound, a thin one as partial, and a loud thin one as overconfident", () => {
    const sound = evaluate(replay(strongPath));
    assert.equal(sound.grade, "strong");
    assert.equal(sound.correct, true);
    assert.match(sound.whatHappened, /short of/i);
    assert.match(sound.whatHappened, /do not prove/i);

    const thin = evaluate(
      replay([
        { type: "begin" },
        { type: "inspect", siteId: "powerhouse" },
        { type: "inquire", inquiryId: "breaker-log" },
        { type: "working", hypothesisId: "isolation" },
        { type: "alternative", hypothesisId: "failure" },
        { type: "submit", confidence: "moderate" },
      ]),
    );
    assert.equal(thin.grade, "partial");

    const loud = evaluate(
      replay([
        { type: "begin" },
        { type: "inspect", siteId: "breakwater" },
        { type: "inquire", inquiryId: "witness-rib" },
        { type: "working", hypothesisId: "isolation" },
        { type: "alternative", hypothesisId: "sabotage" },
        { type: "submit", confidence: "high" },
      ]),
    );
    assert.equal(loud.grade, "overconfident");
    assert.match(loud.confidenceNote, /not enough|do not contain both/i);
  });

  it("explains a plausible wrong reading without treating a foggy sighting as proof", () => {
    const debrief = evaluate(
      replay([
        { type: "begin" },
        { type: "inspect", siteId: "breakwater" },
        { type: "inspect", siteId: "berth7" },
        { type: "inquire", inquiryId: "witness-rib" },
        { type: "inquire", inquiryId: "sensor-dump" },
        { type: "working", hypothesisId: "sabotage" },
        { type: "alternative", hypothesisId: "isolation" },
        { type: "submit", confidence: "high" },
      ]),
    );
    assert.equal(debrief.grade, "misread");
    assert.equal(debrief.correct, false);
    assert.match(debrief.consequences, /apology/);
    assert.match(debrief.whatHappened, /weaker than a seized one/i);
    const witness = debrief.supporting.find((item) => item.id === "witness-rib");
    assert.ok(witness);
    assert.equal(witness.uncertainty, "high");
    assert.match(witness.interpretation, /another/);
  });

  it("lets the breaker log strain plant failure while the sensor still fits it", () => {
    const reading = weigh(["breaker-log", "sensor-dump", "work-order"], "failure");
    assert.equal(reading.strain, 1);
    assert.ok(reading.support >= 1);
    const isolation = weigh(["breaker-log", "sensor-dump", "work-order"], "isolation");
    assert.equal(isolation.strain, 0);
    assert.ok(isolation.support >= 2);
  });

  it("cannot be emptied: the records cost more than the desk", () => {
    const cost = INQUIRIES.reduce((sum, item) => sum + item.cost, 0);
    assert.ok(cost > DESK_MINUTES);
    assert.equal(new Set(INQUIRIES.map((item) => item.evidenceId)).size, EVIDENCE.length);
    assert.equal(new Set(SITES.map((item) => item.id)).size, SITES.length);
  });

  it("does not state the reconstruction as established fact inside a record", () => {
    for (const evidence of EVIDENCE) {
      const text = `${evidence.observation}\n${evidence.interpretation}`;
      assert.doesNotMatch(text, /there was no (chemical )?release/i);
      assert.doesNotMatch(text, /she was mistaken/i);
      assert.doesNotMatch(text, /Ellison (opened|shut|decided)/i);
    }
  });

  it("restarts to a fresh briefing", () => {
    assert.deepEqual(createInitialState(), createInitialState());
    const again = createInitialState();
    assert.equal(again.phase, "briefing");
    assert.equal(again.log.length, 0);
  });
});
