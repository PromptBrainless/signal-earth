import { COAST_REGIONS } from "@/lib/signal/content";
import { cn } from "./ui";

interface CoastChartProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function CoastChart({ selected, onSelect }: CoastChartProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-bg">
      <svg
        viewBox="0 0 800 640"
        className="block h-auto w-full"
        role="img"
        aria-label="Reference chart of the Cinder Coast. Fictional geography."
      >
        <rect width="800" height="640" className="fill-bg" />
        {Array.from({ length: 8 }, (_, index) => (
          <line
            key={index}
            x1={index * 100}
            y1="0"
            x2={index * 100}
            y2="640"
            className="stroke-line"
            strokeWidth="1"
            opacity="0.4"
          />
        ))}
        <path
          d="M0 640 L0 420 C80 400 120 460 180 440 C260 410 280 480 360 500 C440 520 470 430 540 400 C620 360 660 390 800 340 L800 640 Z"
          className="fill-raised stroke-line"
          strokeWidth="2"
        />
        <path
          d="M470 400 C520 280 500 180 560 80"
          className="fill-none stroke-line"
          strokeWidth="2"
          strokeDasharray="5 7"
        />
        <text x="36" y="600" className="fill-muted" style={{ fontSize: 13 }}>
          CINDER COAST
        </text>
        <text x="620" y="48" className="fill-muted" style={{ fontSize: 12 }}>
          N
        </text>
      </svg>
      {COAST_REGIONS.map((region) => {
        const active = selected === region.id;
        return (
          <button
            key={region.id}
            type="button"
            aria-pressed={active}
            aria-label={region.name}
            onClick={() => onSelect(region.id)}
            className="absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
          >
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-full border text-xs font-semibold",
                active
                  ? "border-accent bg-accent text-accent-ink"
                  : region.incident
                    ? "border-accent bg-raised text-accent"
                    : "border-line bg-surface text-fg",
              )}
            >
              {region.code}
            </span>
            <span className="mt-1 max-w-28 text-center text-xs leading-tight text-fg">
              {region.name}
            </span>
          </button>
        );
      })}
      <p className="pointer-events-none absolute bottom-2 left-3 text-xs text-muted">
        Reference geography · not case evidence
      </p>
    </div>
  );
}
