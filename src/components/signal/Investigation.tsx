import { useState } from "react";
import {
  evidenceById,
  HYPOTHESES,
  hypothesisById,
  INQUIRIES,
  SITES,
  SITREP,
  siteById,
  type Confidence,
  type SiteId,
} from "@/lib/signal/content";
import { useSignal } from "@/lib/signal/store";
import { EvidenceCard } from "./EvidenceCard";
import { HarborChart } from "./HarborChart";
import { Button, cn, Pill } from "./ui";

type Tab = "plot" | "file" | "time" | "assess";

const TABS: { id: Tab; label: string }[] = [
  { id: "plot", label: "Plot" },
  { id: "file", label: "File" },
  { id: "time", label: "Timeline" },
  { id: "assess", label: "Assess" },
];

export function Investigation() {
  const sim = useSignal((state) => state.sim);
  const dispatch = useSignal((state) => state.dispatch);
  const [tab, setTab] = useState<Tab>("plot");
  const [selected, setSelected] = useState<SiteId | null>(null);
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [confirming, setConfirming] = useState(false);

  const site = selected ? siteById(selected) : null;
  const siteInquiries = INQUIRIES.filter((item) => item.siteId === selected);
  const records = sim.inquiries.map((id) => evidenceById(id)).sort((a, b) => a.t - b.t);

  function frame(siteId: SiteId) {
    setSelected(siteId);
    setTab("plot");
    if (!sim.inspected.includes(siteId)) {
      dispatch({ type: "inspect", siteId });
    }
  }

  const fileReason = !sim.working
    ? "Name a working reading."
    : !sim.alternative
      ? "Name the reading you are setting aside."
      : !confidence
        ? "Choose a confidence."
        : null;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 lg:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-balance">The Silent Harbor</h1>
          <p className="mt-1 text-sm text-muted">
            Pull records. Keep two readings in play. File only what the file can bear.
          </p>
        </div>
        <p className="font-serif text-3xl tabular-nums text-accent" aria-live="polite">
          {sim.minutesLeft}
          <span className="ml-2 font-sans text-sm text-muted">min left</span>
        </p>
      </div>

      <div role="tablist" aria-label="Case desk" className="flex gap-2 overflow-x-auto">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "min-h-11 shrink-0 rounded-lg border px-4 text-sm",
              tab === item.id
                ? "border-accent bg-accent text-accent-ink"
                : "border-line bg-surface text-fg",
            )}
          >
            {item.label}
            {item.id === "file" ? ` · ${records.length}` : ""}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className={tab === "plot" ? "block" : "hidden lg:block"}>
          <HarborChart
            inspected={sim.inspected}
            inquiries={sim.inquiries}
            selected={selected}
            onSelect={frame}
          />
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {SITES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => frame(item.id)}
                className={cn(
                  "min-h-11 shrink-0 rounded-lg border px-3 text-sm",
                  selected === item.id
                    ? "border-accent bg-raised text-accent"
                    : "border-line bg-surface text-fg",
                )}
              >
                {item.code} {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          {tab === "plot" && !site && (
            <section className="rounded-lg border border-dashed border-line bg-surface p-4">
              <h2 className="font-serif text-xl">Choose a place</h2>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">
                Framing a location is free. Pulling a record spends desk time. Nothing on the plot
                is marked as the answer.
              </p>
            </section>
          )}

          {tab === "plot" && site && (
            <section className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4">
              <div>
                <p className="text-xs font-medium tracking-widest text-muted">LOCATION</p>
                <h2 className="font-serif text-2xl text-balance">{site.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-pretty">{site.summary}</p>
              </div>
              <ul className="flex flex-col gap-2">
                {sim.inspected.includes(site.id) ? (
                  siteInquiries.map((inquiry) => {
                    const done = sim.inquiries.includes(inquiry.id);
                    const short = !done && inquiry.cost > sim.minutesLeft;
                    return (
                      <li key={inquiry.id}>
                        <Button
                          block
                          variant={done ? "ghost" : "quiet"}
                          disabled={done || short}
                          onClick={() => dispatch({ type: "inquire", inquiryId: inquiry.id })}
                        >
                          <span className="flex w-full items-center justify-between gap-3">
                            <span>{done ? inquiry.title : inquiry.question}</span>
                            <span className="shrink-0 tabular-nums text-muted">
                              {done ? "Filed" : `${inquiry.cost} min`}
                            </span>
                          </span>
                        </Button>
                        {short && (
                          <p className="mt-1 text-xs text-muted">
                            Needs {inquiry.cost} minutes. You have {sim.minutesLeft}.
                          </p>
                        )}
                      </li>
                    );
                  })
                ) : (
                  <li>
                    <Button block variant="primary" onClick={() => frame(site.id)}>
                      Frame this location
                    </Button>
                  </li>
                )}
              </ul>
            </section>
          )}

          {tab === "file" && (
            <section className="flex flex-col gap-3">
              {records.length === 0 ? (
                <Empty
                  title="The file is empty"
                  body="The briefing is not evidence. Frame a place and pull a record. Each card separates what was recorded from what it might mean."
                />
              ) : (
                records.map((evidence) => <EvidenceCard key={evidence.id} evidence={evidence} />)
              )}
            </section>
          )}

          {tab === "time" && (
            <section className="flex flex-col gap-3">
              <ol className="flex flex-col gap-3 border-l border-line pl-4">
                {[
                  ...SITREP.map((beat) => ({
                    key: `s-${beat.t}`,
                    t: beat.t,
                    timeLabel: beat.timeLabel,
                    kicker: "Situation",
                    title: beat.text,
                    detail: "Given in the briefing. Not a record you pulled.",
                  })),
                  ...records.map((evidence) => ({
                    key: evidence.id,
                    t: evidence.t,
                    timeLabel: evidence.timeLabel,
                    kicker: "Record",
                    title: evidence.title,
                    detail: evidence.observation,
                  })),
                ]
                  .sort((a, b) => a.t - b.t)
                  .map((row) => (
                    <li key={row.key} className="relative">
                      <span className="absolute -left-[1.2rem] top-1.5 size-2 rounded-full bg-accent" />
                      <p className="text-xs text-accent">
                        {row.timeLabel} · {row.kicker}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-pretty">{row.title}</p>
                      {row.kicker === "Record" && (
                        <p className="mt-1 text-sm leading-relaxed text-pretty text-muted">
                          {row.detail}
                        </p>
                      )}
                    </li>
                  ))}
              </ol>
              {sim.log.length > 0 && (
                <div className="rounded-lg border border-line bg-surface p-4">
                  <h2 className="text-sm font-medium">Desk log</h2>
                  <ul className="mt-2 flex flex-col gap-1 text-sm text-muted">
                    {sim.log.map((entry, index) => (
                      <li key={`${entry.minutesSpent}-${index}`}>
                        <span className="tabular-nums text-fg">{entry.minutesSpent} min</span>
                        {" · "}
                        {entry.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {tab === "assess" && (
            <section className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-pretty text-muted">
                The file does not rank these. Each record says what it fits and what it strains. A
                fit is not a verdict, and a strain is an objection, not a disproof. Name the reading
                you will file and the one you are setting aside.
              </p>

              <ul className="flex flex-col gap-3">
                {HYPOTHESES.map((item) => {
                  const working = sim.working === item.id;
                  const aside = sim.alternative === item.id;
                  return (
                    <li key={item.id} className="rounded-lg border border-line bg-surface p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif text-xl">{item.label}</h3>
                        {working && <Pill tone="accent">Working</Pill>}
                        {aside && <Pill>Set aside</Pill>}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">
                        {item.claim}
                      </p>
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <Button
                          variant={working ? "primary" : "quiet"}
                          onClick={() => dispatch({ type: "working", hypothesisId: item.id })}
                        >
                          Use this reading
                        </Button>
                        <Button
                          variant="ghost"
                          disabled={!sim.working || working}
                          onClick={() =>
                            dispatch({ type: "alternative", hypothesisId: item.id })
                          }
                        >
                          Set this aside
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <fieldset className="rounded-lg border border-line bg-surface p-4">
                <legend className="px-1 text-sm font-medium">Confidence in the file</legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(["low", "moderate", "high"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      aria-pressed={confidence === level}
                      onClick={() => setConfidence(level)}
                      className={cn(
                        "min-h-11 rounded-lg border capitalize",
                        confidence === level
                          ? "border-accent bg-accent text-accent-ink"
                          : "border-line bg-bg text-fg",
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </fieldset>

              {fileReason && <p className="text-sm text-muted">{fileReason}</p>}

              {confirming && sim.working && sim.alternative && confidence ? (
                <div className="rounded-lg border border-accent/50 bg-surface p-4">
                  <p className="text-sm leading-relaxed text-pretty">
                    File <strong>{hypothesisById(sim.working).label}</strong> at {confidence}{" "}
                    confidence, and set aside{" "}
                    <strong>{hypothesisById(sim.alternative).label}</strong>.{" "}
                    {sim.minutesLeft} minutes will go unused. You cannot add records after this.
                  </p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <Button
                      variant="primary"
                      onClick={() => dispatch({ type: "submit", confidence })}
                    >
                      File the assessment
                    </Button>
                    <Button variant="quiet" onClick={() => setConfirming(false)}>
                      Keep working
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="primary"
                  disabled={Boolean(fileReason)}
                  onClick={() => setConfirming(true)}
                >
                  Review and file
                </Button>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-surface p-4">
      <h2 className="font-serif text-xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">{body}</p>
    </div>
  );
}
