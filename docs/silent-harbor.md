# The Silent Harbor

Fictional investigation. Virelle, Sable Line, MV Kestrel, Mara Ellison, Noll & Pike, and Ivo Marr are invented.

## Audit

This workspace had no God's Eye View app, no globe, and no map modules — only the app-builder shell. The coast chart and the case were added together. The chart stays usable while a case is open. Leaving the case does not reset the desk. Restart does.

No external APIs. No new runtime dependencies. Auth and database stay off. The simulation in `src/lib/signal` does not import React.

## Play

1. Read the briefing and open the desk. Chart, in the header, is the coast reference and is not evidence.
2. Frame places on the harbor plot. Looking is free.
3. Spend the 120 desk minutes on records. You cannot pull all of them.
4. On Assess, compare the four readings. Name a working reading and the one you are setting aside. Choose a confidence and file.
5. Read the debrief, then restart. The same actions produce the same file.

The strongest operational reading is a deliberate local isolation made on a sensor that may not mean what the duty screen says. The debrief does not treat that as courtroom proof. Wrong readings — sabotage, plant failure, remote intrusion — stay plausible if you never pull the records that strain them.

## Checks

`src/lib/signal/sim.test.ts` covers cost, refusal, determinism, warrant, and the four grades. It is included in `npm test`.
