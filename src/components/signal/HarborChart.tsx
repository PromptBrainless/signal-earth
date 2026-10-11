import { INQUIRIES, SITES, type InquiryId, type SiteId } from "@/lib/signal/content";
import { cn } from "./ui";

interface HarborChartProps {
  inspected: readonly SiteId[];
  inquiries: readonly InquiryId[];
  selected: SiteId | null;
  onSelect: (siteId: SiteId) => void;
}

function siteHasRecord(siteId: SiteId, inquiries: readonly InquiryId[]): boolean {
  return INQUIRIES.some((item) => item.siteId === siteId && inquiries.includes(item.id));
}

export function HarborChart({ inspected, inquiries, selected, onSelect }: HarborChartProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-bg">
      <svg
        viewBox="0 0 800 640"
        className="block h-auto w-full"
        role="img"
        aria-label="Schematic plot of Virelle Harbor. Not a hydrographic survey."
      >
        <rect width="800" height="640" className="fill-bg" />
        {Array.from({ length: 9 }, (_, index) => (
          <line
            key={`v${index}`}
            x1={80 + index * 80}
            y1="0"
            x2={80 + index * 80}
            y2="640"
            className="stroke-line"
            strokeWidth="1"
            opacity="0.45"
          />
        ))}
        {Array.from({ length: 7 }, (_, index) => (
          <line
            key={`h${index}`}
            x1="0"
            y1={40 + index * 90}
            x2="800"
            y2={40 + index * 90}
            className="stroke-line"
            strokeWidth="1"
            opacity="0.45"
          />
        ))}
        <path
          d="M0 640 L0 250 L90 230 L150 280 L210 250 C270 220 300 290 360 310 L430 330 L455 400 L540 370 L590 450 L700 470 L800 520 L800 640 Z"
          className="fill-raised stroke-line"
          strokeWidth="2"
        />
        <path
          d="M30 210 Q180 90 340 150"
          className="fill-none stroke-fg"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M30 210 Q180 90 340 150"
          className="fill-none stroke-bg"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="455"
          y="300"
          width="28"
          height="110"
          className="fill-surface stroke-line"
          strokeWidth="2"
        />
        <circle cx="620" cy="100" r="36" className="fill-none stroke-line" strokeDasharray="4 6" />
        <text x="48" y="610" className="fill-muted" style={{ fontSize: 13 }}>
          VIRELLE
        </text>
        <text x="600" y="150" className="fill-muted" style={{ fontSize: 12 }}>
          11
        </text>
        <text x="500" y="220" className="fill-muted" style={{ fontSize: 12 }}>
          7.4
        </text>
        <text x="250" y="160" className="fill-muted" style={{ fontSize: 12 }}>
          6
        </text>
        <text x="700" y="40" className="fill-muted" style={{ fontSize: 12 }}>
          N
        </text>
      </svg>
      {SITES.map((site) => {
        const open = inspected.includes(site.id);
        const filed = siteHasRecord(site.id, inquiries);
        const active = selected === site.id;
        return (
          <button
            key={site.id}
            type="button"
            aria-pressed={active}
            aria-label={`${site.name}${filed ? ", record filed" : open ? ", framed" : ""}`}
            onClick={() => onSelect(site.id)}
            className="absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${site.x}%`, top: `${site.y}%` }}
          >
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-full border text-xs font-semibold",
                active && "border-accent bg-accent text-accent-ink",
                !active && filed && "border-accent bg-raised text-accent",
                !active && !filed && open && "border-fg bg-surface text-fg",
                !active && !filed && !open && "border-line bg-bg text-muted",
              )}
            >
              {site.code}
            </span>
            <span className="mt-1 hidden max-w-24 text-center text-xs leading-tight text-fg sm:block">
              {site.name}
            </span>
          </button>
        );
      })}
      <p className="pointer-events-none absolute bottom-2 left-3 right-3 text-xs text-muted">
        Schematic plot · not a survey · pins are places, not answers
      </p>
    </div>
  );
}
