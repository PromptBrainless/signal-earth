import {
  evidenceById,
  hypothesisById,
  HYPOTHESES,
  INQUIRIES,
  type Confidence,
  type Evidence,
  type HypothesisId,
  type InquiryId,
} from "./content.ts";
import type { SimState } from "./sim.ts";

export type Grade = "strong" | "partial" | "misread" | "overconfident";

export interface Weighing {
  support: number;
  strain: number;
}

export interface Missed {
  id: InquiryId;
  note: string;
}

export interface Debrief {
  grade: Grade;
  gradeLabel: string;
  headline: string;
  correct: boolean;
  narrative: string;
  confidenceNote: string;
  consequences: string;
  objection: string | null;
  whatHappened: string;
  supporting: Evidence[];
  straining: Evidence[];
  missed: Missed[];
  unusedMinutes: number;
}

const TRUTH: HypothesisId = "isolation";

const GRADE_LABEL: Record<Grade, string> = {
  strong: "Sound assessment",
  partial: "Right shape, thin warrant",
  misread: "Plausible, not supported",
  overconfident: "Confidence ahead of the file",
};

const WHAT_HAPPENED = [
  "Best reconstruction, short of a confession or a test of the holds. Night engineer Mara Ellison was badged from the tower to the ring house in the minutes before the lights died. Breaker 4's recorder stores a local manual open under her badge: not a thermal trip, not a remote command.",
  "Quay sensor S-7 had climbed hard just before that. A Noll & Pike work order from the previous afternoon says the sensor was left in BENCH after a filter swap, recommission unsigned. In that mode a duty screen can show a number that is not a concentration. The file has no sample, no smell report, and no injury that would corroborate a release. Kestrel's advance declaration says kiln dust and no dangerous-goods class. A declaration is not a test of the cargo.",
  "The ship's tracking gap matches the fog and the moment the repeater lost power. The fixes on either side are a ship that held, not a track that jumped. Sable boat Moth-3 filed a transfer and an abort at 02:05. The GPS trail the company volunteered stays north of the light. A volunteered trail is weaker than a seized one. Ivo Marr's statement is one pair of eyes, at night, in fog.",
  "Nothing in the file proves what Ellison believed. The manual open, her route, and an alarm she was in a position to see are why a deliberate isolation is the strongest reading. They do not prove her motive. They do not prove the basin was safe.",
].join("\n\n");

function has(state: SimState, id: InquiryId): boolean {
  return state.inquiries.includes(id);
}

/** Human act at the panel, plus a reason to distrust the alarm. */
export function hasWarrant(state: SimState): boolean {
  const humanAct = has(state, "breaker-log") || has(state, "scada-origin");
  const sensorStory = has(state, "sensor-dump") || has(state, "work-order");
  return humanAct && sensorStory;
}

export function weigh(inquiryIds: readonly InquiryId[], hypothesis: HypothesisId): Weighing {
  let support = 0;
  let strain = 0;
  for (const id of inquiryIds) {
    const evidence = evidenceById(id);
    if (evidence.supports.includes(hypothesis)) support += 1;
    if (evidence.strains.includes(hypothesis)) strain += 1;
  }
  return { support, strain };
}

export function gradeOf(state: SimState): Grade {
  if (!state.working || !state.confidence) return "misread";
  if (state.working !== TRUTH) return "misread";
  const warrant = hasWarrant(state);
  if (!warrant && state.confidence === "high") return "overconfident";
  if (!warrant) return "partial";
  if (state.confidence === "low") return "partial";
  return "strong";
}

function confidenceNote(state: SimState, grade: Grade): string {
  const confidence = state.confidence;
  if (grade === "strong" && confidence === "moderate") {
    return "Moderate confidence matches a file that supports the operational reading and still has no confession and no test of the cargo.";
  }
  if (grade === "strong" && confidence === "high") {
    return "High confidence is defensible as confidence in the operational reading. You had a local human act and a reason the alarm could lie. It is not confidence in an unspoken motive.";
  }
  if (grade === "overconfident") {
    return "High confidence says the file is enough to act as if the question were closed. The records you actually pulled do not contain both the act and the sensor's mode.";
  }
  if (grade === "partial" && confidence === "low") {
    return "Low confidence is honest about the holes. It also tells the master not to move yet.";
  }
  if (grade === "partial") {
    return hasWarrant(state)
      ? "You had a warrant and still filed it as a low-confidence hunch. The master will wait for someone surer."
      : "You have one half of the story. A person at a switch, or a lying sensor, is not yet both.";
  }
  if (confidence === "high") {
    return "You filed the weaker reading at high confidence. The master will treat that certainty as part of the mistake.";
  }
  if (confidence === "low") {
    return "Low confidence limits how hard the master leans. It does not repair the reading.";
  }
  return "Moderate confidence still asks the master to prefer this reading over the one you set aside.";
}

function consequences(hypothesis: HypothesisId, grade: Grade): string {
  if (hypothesis === "isolation" && grade === "strong") {
    return "The master orders the ring reclosed under a senior watch, sensor S-7 taken offline, and Kestrel brought in on a documentary check of the declaration rather than a chemical closure. Ellison is stood down from night duty pending review. She is not arrested. The basin loses about four hours.";
  }
  if (hypothesis === "isolation" && grade === "partial") {
    return "The master will not move on a shape he cannot see the warrant for. He holds Kestrel and tasks the missing records himself. The right call arrives after dawn. The basin loses the morning tide. No one is wrongly detained.";
  }
  if (hypothesis === "isolation" && grade === "overconfident") {
    return "The master acts at once, because you sounded finished. The ring comes back, the sensor is quarantined, Ellison is stood down. The review board then compares your confidence with your file and writes that you certified a method and a motive the records you pulled did not both contain. The basin recovers. The certainty does not.";
  }
  if (hypothesis === "sabotage") {
    return "The master keeps the basin closed and has Moth-3's crew met at dawn. If you never placed Ellison at the ring house, that badge trail stays in a drawer while a sweep treats the open breaker as a possible accomplice. Kestrel is diverted toward Sable Roads — the commercial result a sabotage would be for. The crew is released later, with an apology the port will have to mean.";
  }
  if (hypothesis === "failure") {
    return "Maintenance replaces a transformer that did not trip and leaves sensor S-7 in service. If a person opened the breaker by hand, nobody interviews that badge. The fog becomes the official story. The next alarm lands on the same channel.";
  }
  return "The master isolates the port network and calls the control-system vendor. Pilot dispatch waits on a clean network that was not the constraint. A local keypad event, if it is even in your file, sits unexplained while the morning is spent hunting an intruder who left no session. Kestrel holds until the vendor confirms what the historian already stored.";
}

function narrative(state: SimState, grade: Grade): string {
  const working = state.working ? hypothesisById(state.working).label : "No reading";
  const alternative = state.alternative
    ? hypothesisById(state.alternative).label
    : "nothing";
  if (grade === "strong") {
    return `You filed ${working} and set ${alternative} aside. The file you pulled contains a local human act at the breaker and a reason the quay alarm could be lying. That is enough to prefer isolation over a trip, a remote command, or a boat in the fog. It is not a completed proof.`;
  }
  if (grade === "overconfident") {
    return `You filed ${working} at high confidence and set ${alternative} aside. The reading can still be the right shape. The file you assembled does not yet earn the tone you used. High confidence, on this desk, is a claim about records, not about instinct.`;
  }
  if (grade === "partial") {
    const hole = hasWarrant(state)
      ? "You already held both halves and still would not stand on them."
      : "You have a person, or a suspect sensor, but not both.";
    return `You filed ${working} and set ${alternative} aside. The shape matches the strongest reconstruction. ${hole} The master can use the shape. He cannot treat it as finished.`;
  }
  return `You filed ${working} and set ${alternative} aside. ${working} was a serious candidate. The records that would have strained it, or the records that point at a person at the panel, were either missing or outweighed. The debrief will not pretend the loser was absurd.`;
}

function objection(straining: Evidence[]): string | null {
  if (straining.length === 0) return null;
  const titles = straining.map((item) => item.title).join("; ");
  return `You had already filed a record that strains this reading: ${titles}. That record is not proof of the opposite. It is a live objection your assessment did not absorb.`;
}

export function evaluate(state: SimState): Debrief {
  const confidence: Confidence | null = state.confidence;
  const grade = gradeOf(state);
  const working = state.working;
  const supporting: Evidence[] = [];
  const straining: Evidence[] = [];
  if (working) {
    for (const id of state.inquiries) {
      const evidence = evidenceById(id);
      if (evidence.supports.includes(working)) supporting.push(evidence);
      if (evidence.strains.includes(working)) straining.push(evidence);
    }
  }
  const missed = INQUIRIES.filter((item) => !state.inquiries.includes(item.id))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3)
    .map((item) => ({ id: item.id, note: item.missedNote }));

  return {
    grade,
    gradeLabel: GRADE_LABEL[grade],
    headline: headlineFor(grade),
    correct: working === TRUTH,
    narrative: narrative(state, grade),
    confidenceNote: confidence ? confidenceNote(state, grade) : "No confidence was filed.",
    consequences: working ? consequences(working, grade) : "Nothing was filed.",
    objection: objection(straining),
    whatHappened: WHAT_HAPPENED,
    supporting,
    straining,
    missed,
    unusedMinutes: state.minutesLeft,
  };
}

function headlineFor(grade: Grade): string {
  switch (grade) {
    case "strong":
      return "The record supports the call you filed.";
    case "partial":
      return "The shape is right. The warrant is not finished.";
    case "overconfident":
      return "The call may be the right shape. The confidence is not earned.";
    case "misread":
      return "A serious reading — and the wrong one to act on.";
  }
}

export function comparison(state: SimState): { id: HypothesisId; label: string; weigh: Weighing }[] {
  return HYPOTHESES.map((item) => ({
    id: item.id,
    label: item.label,
    weigh: weigh(state.inquiries, item.id),
  }));
}
