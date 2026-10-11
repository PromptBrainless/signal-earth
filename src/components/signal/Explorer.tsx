import { useState } from "react";
import { COAST_REGIONS, FICTION_NOTE } from "@/lib/signal/content";
import { useSignal } from "@/lib/signal/store";
import { CoastChart } from "./CoastChart";
import { Button } from "./ui";

export function Explorer() {
  const [selected, setSelected] = useState<string>("virelle");
  const setMode = useSignal((state) => state.setMode);
  const phase = useSignal((state) => state.sim.phase);
  const region = COAST_REGIONS.find((item) => item.id === selected) ?? COAST_REGIONS[2];

  const caseLabel =
    phase === "briefing" ? "Read the briefing" : phase === "debrief" ? "Read the debrief" : "Return to the desk";

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:px-6">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="font-serif text-3xl text-balance">Cinder Coast</h1>
          <p className="mt-1 text-sm text-muted">{FICTION_NOTE}</p>
        </div>
        <CoastChart selected={selected} onSelect={setSelected} />
      </div>
      <aside className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4">
        <p className="text-xs font-medium tracking-widest text-muted">REFERENCE · NOT A RECORD</p>
        <h2 className="font-serif text-2xl text-balance">{region.name}</h2>
        <p className="text-sm leading-relaxed text-pretty">{region.dossier}</p>
        {region.incident ? (
          <Button variant="primary" onClick={() => setMode("case")}>
            {caseLabel}
          </Button>
        ) : (
          <p className="text-sm text-muted">No incident file is open on this stretch.</p>
        )}
      </aside>
    </div>
  );
}
