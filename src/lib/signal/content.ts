/** Fictional case data for The Silent Harbor. Not a real port, ship, or person. */

export type HypothesisId = "isolation" | "sabotage" | "failure" | "intrusion";

export type SiteId =
  | "berth7"
  | "powerhouse"
  | "tower"
  | "breakwater"
  | "kestrel"
  | "workshop";

export type InquiryId =
  | "sensor-dump"
  | "chem-manifest"
  | "breaker-log"
  | "badge-timeline"
  | "radio-log"
  | "scada-origin"
  | "witness-rib"
  | "ais-track"
  | "halden-schedule"
  | "work-order";

export type EvidenceId = InquiryId;

export type Confidence = "low" | "moderate" | "high";

export type Uncertainty = "low" | "moderate" | "high";

export interface Hypothesis {
  id: HypothesisId;
  label: string;
  claim: string;
}

export interface Site {
  id: SiteId;
  code: string;
  name: string;
  x: number;
  y: number;
  /** Geographic orientation. Free to read. Not a case record. */
  summary: string;
}

export interface Evidence {
  id: EvidenceId;
  title: string;
  timeLabel: string;
  /** Minutes from local midnight. Negative = previous day. */
  t: number;
  siteId: SiteId;
  provenance: string;
  uncertainty: Uncertainty;
  observation: string;
  /** Explicitly not a finding. */
  interpretation: string;
  supports: HypothesisId[];
  strains: HypothesisId[];
}

export interface Inquiry {
  id: InquiryId;
  siteId: SiteId;
  title: string;
  question: string;
  cost: number;
  evidenceId: EvidenceId;
  /** Lower is more important to mention if the player never pulls it. */
  priority: number;
  missedNote: string;
}

export interface SitrepBeat {
  t: number;
  timeLabel: string;
  text: string;
}

export interface CoastRegion {
  id: string;
  code: string;
  name: string;
  x: number;
  y: number;
  dossier: string;
  /** Opens the case. Only Virelle. */
  incident?: boolean;
}

export const FICTION_NOTE =
  "Fictional case. Virelle, the ships, the companies, and the people are invented. This is not a real incident.";

export const HYPOTHESES: readonly Hypothesis[] = [
  {
    id: "isolation",
    label: "Deliberate isolation",
    claim:
      "Someone with access shut the harbor down on purpose, answering a hazard they believed was real.",
  },
  {
    id: "sabotage",
    label: "Commercial sabotage",
    claim:
      "Sable Line, which gains if Virelle stays shut, put a boat inside the incident and killed the ring.",
  },
  {
    id: "failure",
    label: "Plant failure",
    claim:
      "The power ring and the quay sensor failed on their own in the fog. No one decided anything.",
  },
  {
    id: "intrusion",
    label: "Remote intrusion",
    claim:
      "Someone outside the port rewrote the ship track and opened the breaker from afar.",
  },
] as const;

export const SITES: readonly Site[] = [
  {
    id: "berth7",
    code: "B7",
    name: "Berth 7",
    x: 58,
    y: 48,
    summary:
      "Inner-basin quay booked for MV Kestrel. A quay sensor stands on the apron. The ship is not alongside.",
  },
  {
    id: "powerhouse",
    code: "RH",
    name: "Ring house",
    x: 40,
    y: 64,
    summary:
      "The mole building that holds breaker 4. That breaker feeds apron lights, cranes, and the tracking repeater.",
  },
  {
    id: "tower",
    code: "CT",
    name: "Control tower",
    x: 32,
    y: 36,
    summary:
      "Night watch. Radio, the ship-tracking picture, and the public-address console live here.",
  },
  {
    id: "breakwater",
    code: "NB",
    name: "North breakwater",
    x: 20,
    y: 20,
    summary:
      "A hut on the breakwater. One deckhand waited out the fog here. Open water is to the north.",
  },
  {
    id: "kestrel",
    code: "MK",
    name: "Kestrel holding box",
    x: 78,
    y: 16,
    summary:
      "Last plotted stretch for MV Kestrel, east of the harbor light. She was booked at Berth 7 and is still offshore.",
  },
  {
    id: "workshop",
    code: "NP",
    name: "Contractor shed",
    x: 72,
    y: 80,
    summary:
      "Noll & Pike keep a shed inside the fence. They service port sensors under contract.",
  },
] as const;

export const SITREP: readonly SitrepBeat[] = [
  {
    t: 100,
    timeLabel: "01:40",
    text: "The pilot boat reports thick fog rolling off the Pale Shelf.",
  },
  {
    t: 137,
    timeLabel: "02:17",
    text: "Apron lights and cranes die together. A shore camera on battery still sees the basin.",
  },
  {
    t: 190,
    timeLabel: "03:10",
    text: "Kestrel's booked time alongside Berth 7 passes. The ship is still offshore.",
  },
] as const;

export const EVIDENCE: readonly Evidence[] = [
  {
    id: "sensor-dump",
    title: "Quay sensor S-7 dump",
    timeLabel: "02:06–02:11",
    t: 126,
    siteId: "berth7",
    provenance: "Quay logger QL-7, battery-backed archive in the tower.",
    uncertainty: "moderate",
    observation:
      "Sensor S-7 climbed from 4 units to 180 between 02:06 and 02:11, then flatlined when ring power dropped. The duty display labels the channel \"ppm.\" The export does not state the sensor's operating mode.",
    interpretation:
      "A release is one reading of a climbing number. A mis-scaled or uncommissioned channel is another. This dump cannot tell those apart.",
    supports: ["isolation", "failure"],
    strains: [],
  },
  {
    id: "chem-manifest",
    title: "Kestrel advance manifest",
    timeLabel: "Prior day · 18:40",
    t: -320,
    siteId: "berth7",
    provenance: "Port community system, clerk's copy of the advance notice.",
    uncertainty: "low",
    observation:
      "MV Kestrel declares 2,400 tonnes of kiln dust in holds 2 and 3, consignee Virelle Cement Works. No dangerous-goods class is entered. The master signed the declaration.",
    interpretation:
      "If the declaration is honest, the cargo is not a volatile hazard. This page does not test the holds. A false declaration would look the same.",
    supports: ["isolation"],
    strains: [],
  },
  {
    id: "breaker-log",
    title: "Breaker 4 event recorder",
    timeLabel: "02:14:06",
    t: 134,
    siteId: "powerhouse",
    provenance: "Ring house event recorder, local memory, exported by the duty electrician.",
    uncertainty: "low",
    observation:
      "Breaker 4 moved from CLOSED to OPEN at 02:14:06. The event code is MANUAL_KEY, not THERMAL and not REMOTE. The operator field reads badge ELLISON-M. No close is stored after that.",
    interpretation:
      "A person at the panel opened the breaker. The code does not say why. It does sit badly with a pure trip or a remote command.",
    supports: ["isolation"],
    strains: ["failure", "intrusion"],
  },
  {
    id: "badge-timeline",
    title: "Ring house door badges",
    timeLabel: "01:10–02:31",
    t: 70,
    siteId: "powerhouse",
    provenance: "Port access control, night archive.",
    uncertainty: "low",
    observation:
      "Badge ELLISON-M: tower turnstile 01:10, ring house door 02:09, ring house door 02:19, tower turnstile 02:31. No other badge entered the ring house between midnight and 04:00.",
    interpretation:
      "Ellison was at the ring house in the minutes before the lights failed. Presence is not intent. A person who did not badge in would not appear.",
    supports: ["isolation"],
    strains: ["intrusion"],
  },
  {
    id: "radio-log",
    title: "Tower console journal",
    timeLabel: "01:41–02:16",
    t: 133,
    siteId: "tower",
    provenance: "Tower console journal, written automatically.",
    uncertainty: "low",
    observation:
      "At 02:13 a local switch, MUTE_PA, was thrown at the tower console. At 02:16 the tracking repeater dropped off the monitoring bus together with ring voltage. The last voice call is the pilot boat at 01:41: \"thick from the shelf.\" No mayday is stored.",
    interpretation:
      "The public-address mute was a local act, one minute before the breaker event. The repeater dying with the voltage fits a power cut better than a radio-only attack. It does not name who threw the mute.",
    supports: ["isolation"],
    strains: ["intrusion"],
  },
  {
    id: "scada-origin",
    title: "Control historian origin",
    timeLabel: "02:14:06",
    t: 134,
    siteId: "tower",
    provenance: "Control historian and the remote-access gateway.",
    uncertainty: "low",
    observation:
      "One command is stored at 02:14:06. Origin: PANEL_RING_LOCAL. User session: none. The gateway shows no authenticated remote session after 22:10, when the day engineer logged out.",
    interpretation:
      "The open was entered at the ring house panel. A remote actor would usually leave a session. A path that writes no log at all would not appear here either, so this strains a remote reading without exhausting it.",
    supports: ["isolation"],
    strains: ["intrusion"],
  },
  {
    id: "witness-rib",
    title: "Statement of Ivo Marr",
    timeLabel: "About 02:00–02:20",
    t: 120,
    siteId: "breakwater",
    provenance: "Statement to the gate sergeant at 04:55. Not sworn. Single witness.",
    uncertainty: "high",
    observation:
      "Deckhand Ivo Marr, alone in the breakwater hut, says he saw a dark rigid inflatable with \"the Sable stripe,\" moving without a steaming light, after the fog thickened and before the harbor went black. He did not see it enter the basin. He says he had been drinking coffee.",
    interpretation:
      "A clandestine approach is one reading. A routine boat, poorly seen at night in fog, is another. One witness and no light to judge a stripe by.",
    supports: ["sabotage"],
    strains: [],
  },
  {
    id: "ais-track",
    title: "Kestrel tracking fixes",
    timeLabel: "01:52 and 04:22",
    t: 112,
    siteId: "kestrel",
    provenance: "Coastal tracking archive, Pale Head station, which kept its own power.",
    uncertainty: "moderate",
    observation:
      "Kestrel's last fix before the gap is 01:52: 1.9 nm east of the light, 3.1 kn, heading 268. The next fix is 04:22: 1.7 nm east, 0.4 kn, heading 271. The identity does not change. The position does not jump.",
    interpretation:
      "The gap fits a ship that stopped reporting and held. Fog can do that. A dead repeater can do that. A rewritten track usually jumps. This does not say who silenced the repeater.",
    supports: ["isolation", "failure"],
    strains: ["intrusion"],
  },
  {
    id: "halden-schedule",
    title: "Sable boat Moth-3 log",
    timeLabel: "Abort radioed 02:05",
    t: 125,
    siteId: "breakwater",
    provenance:
      "Sable dispatch log, plus a GPS file the company volunteered at 05:10. Not seized.",
    uncertainty: "moderate",
    observation:
      "Moth-3 filed a crew transfer from the roads to a bulker at the outer anchorage, departure 01:30. The coxswain's abort, radioed to Sable dispatch at 02:05, reads \"visibility gone, returning roads, no souls transferred.\" The volunteered GPS breadcrumb stays north of the breakwater light.",
    interpretation:
      "The boat was real and nearby. The paper trail says it turned back. A log written in-house, and a GPS file offered rather than taken, can both be arranged. They still strain a story in which that boat killed the ring.",
    supports: [],
    strains: ["sabotage"],
  },
  {
    id: "work-order",
    title: "Work order NP-4418",
    timeLabel: "Prior day · 14:40",
    t: -560,
    siteId: "workshop",
    provenance: "Noll & Pike job system, copy held by the port facilities clerk.",
    uncertainty: "low",
    observation:
      "Work order NP-4418, sensor S-7: \"replace inlet filter, run bench, leave in BENCH until recommission.\" The recommission line is unsigned. The contractor system marks the job \"complete\" at 15:05.",
    interpretation:
      "The words on the page say the sensor may have been left in a mode the duty display does not explain. \"Complete\" and \"recommissioned\" are different lines, and only one is signed. The page does not prove what the channel showed at 02:06.",
    supports: ["isolation", "failure"],
    strains: [],
  },
] as const;

export const INQUIRIES: readonly Inquiry[] = [
  {
    id: "sensor-dump",
    siteId: "berth7",
    title: "Sensor dump",
    question: "Pull the raw dump from quay sensor S-7",
    cost: 25,
    evidenceId: "sensor-dump",
    priority: 3,
    missedNote: "You never compared the duty numbers on S-7 with the raw channel.",
  },
  {
    id: "chem-manifest",
    siteId: "berth7",
    title: "Cargo manifest",
    question: "Pull Kestrel's advance cargo declaration",
    cost: 20,
    evidenceId: "chem-manifest",
    priority: 10,
    missedNote: "You never saw what the ship claimed to be carrying.",
  },
  {
    id: "breaker-log",
    siteId: "powerhouse",
    title: "Breaker log",
    question: "Export breaker 4's event recorder",
    cost: 30,
    evidenceId: "breaker-log",
    priority: 1,
    missedNote:
      "You never learned whether breaker 4 tripped, was opened by hand, or was commanded from outside.",
  },
  {
    id: "badge-timeline",
    siteId: "powerhouse",
    title: "Door badges",
    question: "Pull ring-house door badges for the night",
    cost: 20,
    evidenceId: "badge-timeline",
    priority: 9,
    missedNote: "You never placed a person at the ring house.",
  },
  {
    id: "radio-log",
    siteId: "tower",
    title: "Console journal",
    question: "Pull the tower console journal",
    cost: 20,
    evidenceId: "radio-log",
    priority: 8,
    missedNote: "You never separated a local mute from a dead repeater.",
  },
  {
    id: "scada-origin",
    siteId: "tower",
    title: "Command origin",
    question: "Ask where the open command originated",
    cost: 30,
    evidenceId: "scada-origin",
    priority: 4,
    missedNote: "You never asked whether the open command was local or remote.",
  },
  {
    id: "witness-rib",
    siteId: "breakwater",
    title: "Deckhand statement",
    question: "Take the deckhand's statement",
    cost: 15,
    evidenceId: "witness-rib",
    priority: 7,
    missedNote:
      "You never tested the boat rumor against the person who claims to have seen it.",
  },
  {
    id: "ais-track",
    siteId: "kestrel",
    title: "Tracking fixes",
    question: "Pull Kestrel's fixes from the Pale Head station",
    cost: 25,
    evidenceId: "ais-track",
    priority: 6,
    missedNote: "You never checked whether Kestrel's track was rewritten or merely silent.",
  },
  {
    id: "halden-schedule",
    siteId: "breakwater",
    title: "Sable boat log",
    question: "Request Sable Line's log for boat Moth-3",
    cost: 25,
    evidenceId: "halden-schedule",
    priority: 5,
    missedNote:
      "You never gave Sable's own log a chance to strain, or support, the boat story.",
  },
  {
    id: "work-order",
    siteId: "workshop",
    title: "Sensor work order",
    question: "Pull yesterday's work orders for sensor S-7",
    cost: 25,
    evidenceId: "work-order",
    priority: 2,
    missedNote: "You never asked who last touched the sensor, or in what mode they left it.",
  },
] as const;

export const COAST_REGIONS: readonly CoastRegion[] = [
  {
    id: "pale",
    code: "PS",
    name: "Pale Shelf",
    x: 62,
    y: 18,
    dossier:
      "A shallow bank north of the harbor. Easterlies pile fog onto it. The pilot boat's 01:40 report — the same line as in the briefing — names this stretch. That is public situation, not a new record.",
  },
  {
    id: "sable",
    code: "SR",
    name: "Sable Roads",
    x: 78,
    y: 40,
    dossier:
      "Deep-water roads and the home anchorage of Sable Line, a commercial neighbor of Virelle. The rumor mill already mentions them. Geography does not make a rumor true. No case record is stored on this chart.",
  },
  {
    id: "virelle",
    code: "VH",
    name: "Virelle Harbor",
    x: 40,
    y: 48,
    incident: true,
    dossier:
      "Industrial harbor on the Cinder Coast. Tonight the apron is dark and MV Kestrel is holding offshore. The case file lives on the desk, not on this reference chart.",
  },
  {
    id: "cinder",
    code: "CR",
    name: "Cinder Reach",
    x: 22,
    y: 74,
    dossier:
      "Old smelter coast, stacks unlit, a navigation nuisance and nothing more tonight. Ships give it room. It is not part of the shutdown.",
  },
] as const;

export function hypothesisById(id: HypothesisId): Hypothesis {
  const found = HYPOTHESES.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown hypothesis ${id}`);
  return found;
}

export function siteById(id: SiteId): Site {
  const found = SITES.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown site ${id}`);
  return found;
}

export function inquiryById(id: InquiryId): Inquiry {
  const found = INQUIRIES.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown inquiry ${id}`);
  return found;
}

export function evidenceById(id: EvidenceId): Evidence {
  const found = EVIDENCE.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown evidence ${id}`);
  return found;
}
