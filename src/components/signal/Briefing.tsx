import { FICTION_NOTE, HYPOTHESES } from "@/lib/signal/content";
import { DESK_MINUTES } from "@/lib/signal/sim";
import { useSignal } from "@/lib/signal/store";
import { Button } from "./ui";

export function Briefing() {
  const dispatch = useSignal((state) => state.dispatch);
  const setMode = useSignal((state) => state.setMode);

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-6 sm:px-6">
      <p className="text-xs tracking-wide text-accent">{FICTION_NOTE}</p>
      <header className="flex flex-col gap-3">
        <p className="text-xs font-medium tracking-widest text-muted">CASE VRL-02 · THE SILENT HARBOR</p>
        <h1 className="font-serif text-4xl leading-tight text-balance sm:text-5xl">
          The harbor went dark.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted">
          You are Leander Voss, seconded to the Virelle Port Authority for the night. At 02:17 the
          apron lights, the cranes, and the tracking repeater died together. MV Kestrel, booked at
          Berth 7 for 03:10, is still holding east of the light. Fog has been thick since 01:40. No
          one is hurt. The basin is shut.
        </p>
      </header>

      <section className="grid gap-4">
        <BriefBlock
          index="01"
          title="What you owe the harbor master"
          body="Name the most likely cause, and say how much confidence the records you actually pull can bear. He will act on your file at the end of your desk time. Confidence is a claim about that file, not about your nerve."
        />
        <BriefBlock
          index="02"
          title="What the desk allows"
          body={`You have ${DESK_MINUTES} minutes. Framing a place on the plot is free. Commissioning a record spends time. You cannot pull every record. File one working reading, name the reading you are setting aside, and choose low, moderate, or high confidence.`}
        />
        <BriefBlock
          index="03"
          title="What the chart will not do"
          body="Four readings are already in the street. All four are plausible. None of them is marked on the plot. A single pin is not the answer. Observations and interpretations are labeled so you can tell them apart."
        />
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="primary" onClick={() => dispatch({ type: "begin" })}>
          Open the desk
        </Button>
        <Button variant="quiet" onClick={() => setMode("chart")}>
          Read the coast chart first
        </Button>
      </div>

      <section>
        <h2 className="font-serif text-2xl text-balance">The four readings</h2>
        <dl className="mt-3 divide-y divide-line border-y border-line">
          {HYPOTHESES.map((item) => (
            <div key={item.id} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
              <dt className="text-sm font-medium text-fg">{item.label}</dt>
              <dd className="text-sm leading-relaxed text-pretty text-muted">{item.claim}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}

function BriefBlock({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <section className="rounded-lg border border-line bg-surface p-4">
      <p className="text-xs font-medium text-accent">{index}</p>
      <h2 className="mt-1 font-serif text-xl text-balance">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">{body}</p>
    </section>
  );
}
