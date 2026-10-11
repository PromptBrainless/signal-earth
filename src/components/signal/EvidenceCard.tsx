import {
  hypothesisById,
  type Evidence,
  type HypothesisId,
} from "@/lib/signal/content";
import { Pill } from "./ui";

function names(ids: readonly HypothesisId[]): string {
  if (ids.length === 0) return "—";
  return ids.map((id) => hypothesisById(id).label).join(" · ");
}

export function EvidenceCard({ evidence }: { evidence: Evidence }) {
  return (
    <article className="rounded-lg border border-line bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-serif text-xl leading-tight text-balance">{evidence.title}</h3>
        <Pill tone="accent">Uncertainty {evidence.uncertainty}</Pill>
      </div>
      <p className="mt-2 text-xs text-muted">
        {evidence.timeLabel}
        <span aria-hidden="true"> · </span>
        {evidence.provenance}
      </p>
      <h4 className="mt-4 text-xs font-semibold tracking-wide text-accent">Observation</h4>
      <p className="mt-1 text-sm leading-relaxed text-pretty">{evidence.observation}</p>
      <h4 className="mt-4 text-xs font-semibold tracking-wide text-muted">
        Interpretation · not established
      </h4>
      <p className="mt-1 text-sm leading-relaxed text-pretty text-muted">
        {evidence.interpretation}
      </p>
      <dl className="mt-4 grid gap-2 border-t border-line pt-3 text-xs sm:grid-cols-2">
        <div>
          <dt className="text-muted">Fits</dt>
          <dd className="mt-0.5 text-fg">{names(evidence.supports)}</dd>
        </div>
        <div>
          <dt className="text-muted">Strains</dt>
          <dd className="mt-0.5 text-fg">{names(evidence.strains)}</dd>
        </div>
      </dl>
    </article>
  );
}
