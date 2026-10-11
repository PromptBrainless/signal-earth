# AGENTS.project.md — SIGNAL EARTH

Product rules for this app. The sandbox contract in `AGENTS.md` still governs
preview, scaffold, and deploy. This file governs the investigation itself.

## Mission

Develop SIGNAL EARTH as a focused investigative simulation.

The first goal is **one complete, compelling, replayable mission**, not a large game with many unfinished systems.

There was no pre-existing God's Eye View tree in this workspace. The coast chart (explorer) and the case share one app. Do not replace that chart with a second framework. Keep the chart usable when the player leaves the case.

## Product vision

The player acts as an investigator who reconstructs a developing incident from incomplete geospatial evidence, conflicting reports, timelines and limited investigative resources.

The experience should feel intelligent, atmospheric, plausible and consequential. The player must reason about evidence rather than simply follow markers.

## Non-negotiable rules

1. Inspect the existing repository before making changes.
2. Preserve the coast chart and the case. Leaving the case must not break the chart.
3. Do not rewrite the application, replace its framework, or reorganize unrelated modules.
4. Follow the actual repository architecture, coding conventions, and dependency boundaries.
5. Verify existing APIs, components, scripts, and test commands from source. Never invent them.
6. Keep the simulation deterministic and separate from presentation.
7. Clearly distinguish fictional gameplay data from real-world data. This mission is fiction.
8. Do not add external API dependencies for the first mission.
9. Prefer small, reviewable changes over broad refactors.
10. Never claim a test passed unless it was actually executed and its result inspected.

## First mission: The Silent Harbor

A fictional harbor incident: an unexplained operational shutdown, incomplete sensor information, conflicting witness accounts, and a limited investigation window.

The player must be able to:

- Enter and exit the mission without breaking the chart.
- Understand the situation and primary objective.
- Inspect relevant locations on the chart.
- Examine evidence and distinguish observations from interpretations.
- Compare at least two plausible hypotheses.
- Spend a limited investigative resource (desk time).
- Make meaningful investigative choices.
- Submit a final assessment with a confidence level.
- Receive a debrief explaining the evidence, uncertainty, consequences, and missed opportunities.
- Restart the mission and obtain a consistent simulation.

## Scope control

Do not build a campaign, multiplayer, an economy, a procedural world, or a second mission before this one is playable and convincing.

## Verification

Run the project tests, `npm run typecheck`, and `npm run build`. Inspect the results. The simulation must be testable without rendering the chart.
