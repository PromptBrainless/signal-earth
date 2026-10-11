import { FICTION_NOTE } from "@/lib/signal/content";
import { useSignal } from "@/lib/signal/store";
import { Briefing } from "./Briefing";
import { Debrief } from "./Debrief";
import { Explorer } from "./Explorer";
import { Investigation } from "./Investigation";
import { cn } from "./ui";

export function SignalEarth() {
  const mode = useSignal((state) => state.mode);
  const phase = useSignal((state) => state.sim.phase);
  const banner = useSignal((state) => state.banner);
  const minutes = useSignal((state) => state.sim.minutesLeft);
  const setMode = useSignal((state) => state.setMode);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6">
          <div>
            <p className="font-serif text-lg leading-none tracking-wide">SIGNAL EARTH</p>
            <p className="mt-1 text-xs text-muted">Cinder Coast · fictional</p>
          </div>
          <nav className="flex items-center gap-2" aria-label="Modes">
            {mode === "case" && phase === "investigating" && (
              <span className="mr-1 hidden text-sm tabular-nums text-muted sm:inline">
                {minutes} min
              </span>
            )}
            <button
              type="button"
              aria-pressed={mode === "chart"}
              onClick={() => setMode("chart")}
              className={cn(
                "min-h-11 rounded-lg border px-4 text-sm",
                mode === "chart"
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line bg-surface text-fg",
              )}
            >
              Chart
            </button>
            <button
              type="button"
              aria-pressed={mode === "case"}
              onClick={() => setMode("case")}
              className={cn(
                "min-h-11 rounded-lg border px-4 text-sm",
                mode === "case"
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line bg-surface text-fg",
              )}
            >
              Case
            </button>
          </nav>
        </div>
        {banner && (
          <p
            role="status"
            className="border-t border-line px-4 py-2 text-sm text-pretty text-fg lg:px-6"
          >
            {banner}
          </p>
        )}
      </header>
      <main>
        {mode === "chart" ? (
          <Explorer />
        ) : phase === "briefing" ? (
          <Briefing />
        ) : phase === "debrief" ? (
          <Debrief />
        ) : (
          <Investigation />
        )}
      </main>
      <footer className="mx-auto w-full max-w-6xl px-4 py-8 text-xs text-muted lg:px-6">
        {FICTION_NOTE} Leaving the case does not erase the desk. Restart does.
      </footer>
    </div>
  );
}
