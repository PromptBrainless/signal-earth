import { evidenceById } from "@/lib/signal/content";
import { evaluate } from "@/lib/signal/evaluate";
import { useSignal } from "@/lib/signal/store";
import { EvidenceCard } from "./EvidenceCard";
import { Button } from "./ui";

export function Debrief() {
  const sim = useSignal((state) => state.sim);
  const restart = useSignal((state) => state.restart);
  const setMode = useSignal((state) => state.setMode);
  const report = evaluate(sim);

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
      <header>
        <p className="text-xs font-medium tracking-widest text-accent">{report.gradeLabel}</p>
        <h1 className="mt-2 font-serif text-4xl leading-tight text-balance">{report.headline}</h1>
        <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">{report.narrative}</p>
      </header>

      <section className="rounded-lg border border-line bg-surface p-4">
        <h2 className="font-serif text-xl">What the confidence was worth</h2>
        <p className="mt-2 text-sm leading-relaxed text-pretty">{report.confidenceNote}</p>
      </section>

      <section className="rounded-lg border border-line bg-surface p-4">
        <h2 className="font-serif text-xl">What the master does with it</h2>
        <p className="mt-2 text-sm leading-relaxed text-pretty">{report.consequences}</p>
        {report.objection && (
          <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">{report.objection}</p>
        )}
        <p className="mt-3 text-xs text-muted tabular-nums">
          {report.unusedMinutes} minutes were still on the desk when you filed.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl text-balance">The underlying scenario</h2>
        <p className="text-xs text-accent">
          Shown only after you file. Uncertain where the file is uncertain.
        </p>
        {report.whatHappened.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-sm leading-relaxed text-pretty">
            {paragraph}
          </p>
        ))}
      </section>

      {report.supporting.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Records that fit your reading</h2>
          {report.supporting.map((evidence) => (
            <EvidenceCard key={evidence.id} evidence={evidence} />
          ))}
        </section>
      )}

      {report.straining.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Records that strain it</h2>
          {report.straining.map((evidence) => (
            <EvidenceCard key={evidence.id} evidence={evidence} />
          ))}
        </section>
      )}

      <section className="rounded-lg border border-line bg-surface p-4">
        <h2 className="font-serif text-xl">Left in the drawer</h2>
        {report.missed.length === 0 ? (
          <p className="mt-2 text-sm text-muted">You pulled every record the desk can hold.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-3">
            {report.missed.map((item) => (
              <li key={item.id} className="text-sm leading-relaxed text-pretty">
                <span className="font-medium text-fg">{evidenceById(item.id).title}. </span>
                <span className="text-muted">{item.note}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="primary" onClick={() => restart()}>
          Restart the case
        </Button>
        <Button variant="quiet" onClick={() => setMode("chart")}>
          Return to the coast chart
        </Button>
      </div>
    </article>
  );
}
