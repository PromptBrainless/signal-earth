import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BWMoUGNj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FICTION_NOTE = "Fictional case. Virelle, the ships, the companies, and the people are invented. This is not a real incident.";
var HYPOTHESES = [
	{
		id: "isolation",
		label: "Deliberate isolation",
		claim: "Someone with access shut the harbor down on purpose, answering a hazard they believed was real."
	},
	{
		id: "sabotage",
		label: "Commercial sabotage",
		claim: "Sable Line, which gains if Virelle stays shut, put a boat inside the incident and killed the ring."
	},
	{
		id: "failure",
		label: "Plant failure",
		claim: "The power ring and the quay sensor failed on their own in the fog. No one decided anything."
	},
	{
		id: "intrusion",
		label: "Remote intrusion",
		claim: "Someone outside the port rewrote the ship track and opened the breaker from afar."
	}
];
var SITES = [
	{
		id: "berth7",
		code: "B7",
		name: "Berth 7",
		x: 58,
		y: 48,
		summary: "Inner-basin quay booked for MV Kestrel. A quay sensor stands on the apron. The ship is not alongside."
	},
	{
		id: "powerhouse",
		code: "RH",
		name: "Ring house",
		x: 40,
		y: 64,
		summary: "The mole building that holds breaker 4. That breaker feeds apron lights, cranes, and the tracking repeater."
	},
	{
		id: "tower",
		code: "CT",
		name: "Control tower",
		x: 32,
		y: 36,
		summary: "Night watch. Radio, the ship-tracking picture, and the public-address console live here."
	},
	{
		id: "breakwater",
		code: "NB",
		name: "North breakwater",
		x: 20,
		y: 20,
		summary: "A hut on the breakwater. One deckhand waited out the fog here. Open water is to the north."
	},
	{
		id: "kestrel",
		code: "MK",
		name: "Kestrel holding box",
		x: 78,
		y: 16,
		summary: "Last plotted stretch for MV Kestrel, east of the harbor light. She was booked at Berth 7 and is still offshore."
	},
	{
		id: "workshop",
		code: "NP",
		name: "Contractor shed",
		x: 72,
		y: 80,
		summary: "Noll & Pike keep a shed inside the fence. They service port sensors under contract."
	}
];
var SITREP = [
	{
		t: 100,
		timeLabel: "01:40",
		text: "The pilot boat reports thick fog rolling off the Pale Shelf."
	},
	{
		t: 137,
		timeLabel: "02:17",
		text: "Apron lights and cranes die together. A shore camera on battery still sees the basin."
	},
	{
		t: 190,
		timeLabel: "03:10",
		text: "Kestrel's booked time alongside Berth 7 passes. The ship is still offshore."
	}
];
var EVIDENCE = [
	{
		id: "sensor-dump",
		title: "Quay sensor S-7 dump",
		timeLabel: "02:06–02:11",
		t: 126,
		siteId: "berth7",
		provenance: "Quay logger QL-7, battery-backed archive in the tower.",
		uncertainty: "moderate",
		observation: "Sensor S-7 climbed from 4 units to 180 between 02:06 and 02:11, then flatlined when ring power dropped. The duty display labels the channel \"ppm.\" The export does not state the sensor's operating mode.",
		interpretation: "A release is one reading of a climbing number. A mis-scaled or uncommissioned channel is another. This dump cannot tell those apart.",
		supports: ["isolation", "failure"],
		strains: []
	},
	{
		id: "chem-manifest",
		title: "Kestrel advance manifest",
		timeLabel: "Prior day · 18:40",
		t: -320,
		siteId: "berth7",
		provenance: "Port community system, clerk's copy of the advance notice.",
		uncertainty: "low",
		observation: "MV Kestrel declares 2,400 tonnes of kiln dust in holds 2 and 3, consignee Virelle Cement Works. No dangerous-goods class is entered. The master signed the declaration.",
		interpretation: "If the declaration is honest, the cargo is not a volatile hazard. This page does not test the holds. A false declaration would look the same.",
		supports: ["isolation"],
		strains: []
	},
	{
		id: "breaker-log",
		title: "Breaker 4 event recorder",
		timeLabel: "02:14:06",
		t: 134,
		siteId: "powerhouse",
		provenance: "Ring house event recorder, local memory, exported by the duty electrician.",
		uncertainty: "low",
		observation: "Breaker 4 moved from CLOSED to OPEN at 02:14:06. The event code is MANUAL_KEY, not THERMAL and not REMOTE. The operator field reads badge ELLISON-M. No close is stored after that.",
		interpretation: "A person at the panel opened the breaker. The code does not say why. It does sit badly with a pure trip or a remote command.",
		supports: ["isolation"],
		strains: ["failure", "intrusion"]
	},
	{
		id: "badge-timeline",
		title: "Ring house door badges",
		timeLabel: "01:10–02:31",
		t: 70,
		siteId: "powerhouse",
		provenance: "Port access control, night archive.",
		uncertainty: "low",
		observation: "Badge ELLISON-M: tower turnstile 01:10, ring house door 02:09, ring house door 02:19, tower turnstile 02:31. No other badge entered the ring house between midnight and 04:00.",
		interpretation: "Ellison was at the ring house in the minutes before the lights failed. Presence is not intent. A person who did not badge in would not appear.",
		supports: ["isolation"],
		strains: ["intrusion"]
	},
	{
		id: "radio-log",
		title: "Tower console journal",
		timeLabel: "01:41–02:16",
		t: 133,
		siteId: "tower",
		provenance: "Tower console journal, written automatically.",
		uncertainty: "low",
		observation: "At 02:13 a local switch, MUTE_PA, was thrown at the tower console. At 02:16 the tracking repeater dropped off the monitoring bus together with ring voltage. The last voice call is the pilot boat at 01:41: \"thick from the shelf.\" No mayday is stored.",
		interpretation: "The public-address mute was a local act, one minute before the breaker event. The repeater dying with the voltage fits a power cut better than a radio-only attack. It does not name who threw the mute.",
		supports: ["isolation"],
		strains: ["intrusion"]
	},
	{
		id: "scada-origin",
		title: "Control historian origin",
		timeLabel: "02:14:06",
		t: 134,
		siteId: "tower",
		provenance: "Control historian and the remote-access gateway.",
		uncertainty: "low",
		observation: "One command is stored at 02:14:06. Origin: PANEL_RING_LOCAL. User session: none. The gateway shows no authenticated remote session after 22:10, when the day engineer logged out.",
		interpretation: "The open was entered at the ring house panel. A remote actor would usually leave a session. A path that writes no log at all would not appear here either, so this strains a remote reading without exhausting it.",
		supports: ["isolation"],
		strains: ["intrusion"]
	},
	{
		id: "witness-rib",
		title: "Statement of Ivo Marr",
		timeLabel: "About 02:00–02:20",
		t: 120,
		siteId: "breakwater",
		provenance: "Statement to the gate sergeant at 04:55. Not sworn. Single witness.",
		uncertainty: "high",
		observation: "Deckhand Ivo Marr, alone in the breakwater hut, says he saw a dark rigid inflatable with \"the Sable stripe,\" moving without a steaming light, after the fog thickened and before the harbor went black. He did not see it enter the basin. He says he had been drinking coffee.",
		interpretation: "A clandestine approach is one reading. A routine boat, poorly seen at night in fog, is another. One witness and no light to judge a stripe by.",
		supports: ["sabotage"],
		strains: []
	},
	{
		id: "ais-track",
		title: "Kestrel tracking fixes",
		timeLabel: "01:52 and 04:22",
		t: 112,
		siteId: "kestrel",
		provenance: "Coastal tracking archive, Pale Head station, which kept its own power.",
		uncertainty: "moderate",
		observation: "Kestrel's last fix before the gap is 01:52: 1.9 nm east of the light, 3.1 kn, heading 268. The next fix is 04:22: 1.7 nm east, 0.4 kn, heading 271. The identity does not change. The position does not jump.",
		interpretation: "The gap fits a ship that stopped reporting and held. Fog can do that. A dead repeater can do that. A rewritten track usually jumps. This does not say who silenced the repeater.",
		supports: ["isolation", "failure"],
		strains: ["intrusion"]
	},
	{
		id: "halden-schedule",
		title: "Sable boat Moth-3 log",
		timeLabel: "Abort radioed 02:05",
		t: 125,
		siteId: "breakwater",
		provenance: "Sable dispatch log, plus a GPS file the company volunteered at 05:10. Not seized.",
		uncertainty: "moderate",
		observation: "Moth-3 filed a crew transfer from the roads to a bulker at the outer anchorage, departure 01:30. The coxswain's abort, radioed to Sable dispatch at 02:05, reads \"visibility gone, returning roads, no souls transferred.\" The volunteered GPS breadcrumb stays north of the breakwater light.",
		interpretation: "The boat was real and nearby. The paper trail says it turned back. A log written in-house, and a GPS file offered rather than taken, can both be arranged. They still strain a story in which that boat killed the ring.",
		supports: [],
		strains: ["sabotage"]
	},
	{
		id: "work-order",
		title: "Work order NP-4418",
		timeLabel: "Prior day · 14:40",
		t: -560,
		siteId: "workshop",
		provenance: "Noll & Pike job system, copy held by the port facilities clerk.",
		uncertainty: "low",
		observation: "Work order NP-4418, sensor S-7: \"replace inlet filter, run bench, leave in BENCH until recommission.\" The recommission line is unsigned. The contractor system marks the job \"complete\" at 15:05.",
		interpretation: "The words on the page say the sensor may have been left in a mode the duty display does not explain. \"Complete\" and \"recommissioned\" are different lines, and only one is signed. The page does not prove what the channel showed at 02:06.",
		supports: ["isolation", "failure"],
		strains: []
	}
];
var INQUIRIES = [
	{
		id: "sensor-dump",
		siteId: "berth7",
		title: "Sensor dump",
		question: "Pull the raw dump from quay sensor S-7",
		cost: 25,
		evidenceId: "sensor-dump",
		priority: 3,
		missedNote: "You never compared the duty numbers on S-7 with the raw channel."
	},
	{
		id: "chem-manifest",
		siteId: "berth7",
		title: "Cargo manifest",
		question: "Pull Kestrel's advance cargo declaration",
		cost: 20,
		evidenceId: "chem-manifest",
		priority: 10,
		missedNote: "You never saw what the ship claimed to be carrying."
	},
	{
		id: "breaker-log",
		siteId: "powerhouse",
		title: "Breaker log",
		question: "Export breaker 4's event recorder",
		cost: 30,
		evidenceId: "breaker-log",
		priority: 1,
		missedNote: "You never learned whether breaker 4 tripped, was opened by hand, or was commanded from outside."
	},
	{
		id: "badge-timeline",
		siteId: "powerhouse",
		title: "Door badges",
		question: "Pull ring-house door badges for the night",
		cost: 20,
		evidenceId: "badge-timeline",
		priority: 9,
		missedNote: "You never placed a person at the ring house."
	},
	{
		id: "radio-log",
		siteId: "tower",
		title: "Console journal",
		question: "Pull the tower console journal",
		cost: 20,
		evidenceId: "radio-log",
		priority: 8,
		missedNote: "You never separated a local mute from a dead repeater."
	},
	{
		id: "scada-origin",
		siteId: "tower",
		title: "Command origin",
		question: "Ask where the open command originated",
		cost: 30,
		evidenceId: "scada-origin",
		priority: 4,
		missedNote: "You never asked whether the open command was local or remote."
	},
	{
		id: "witness-rib",
		siteId: "breakwater",
		title: "Deckhand statement",
		question: "Take the deckhand's statement",
		cost: 15,
		evidenceId: "witness-rib",
		priority: 7,
		missedNote: "You never tested the boat rumor against the person who claims to have seen it."
	},
	{
		id: "ais-track",
		siteId: "kestrel",
		title: "Tracking fixes",
		question: "Pull Kestrel's fixes from the Pale Head station",
		cost: 25,
		evidenceId: "ais-track",
		priority: 6,
		missedNote: "You never checked whether Kestrel's track was rewritten or merely silent."
	},
	{
		id: "halden-schedule",
		siteId: "breakwater",
		title: "Sable boat log",
		question: "Request Sable Line's log for boat Moth-3",
		cost: 25,
		evidenceId: "halden-schedule",
		priority: 5,
		missedNote: "You never gave Sable's own log a chance to strain, or support, the boat story."
	},
	{
		id: "work-order",
		siteId: "workshop",
		title: "Sensor work order",
		question: "Pull yesterday's work orders for sensor S-7",
		cost: 25,
		evidenceId: "work-order",
		priority: 2,
		missedNote: "You never asked who last touched the sensor, or in what mode they left it."
	}
];
var COAST_REGIONS = [
	{
		id: "pale",
		code: "PS",
		name: "Pale Shelf",
		x: 62,
		y: 18,
		dossier: "A shallow bank north of the harbor. Easterlies pile fog onto it. The pilot boat's 01:40 report — the same line as in the briefing — names this stretch. That is public situation, not a new record."
	},
	{
		id: "sable",
		code: "SR",
		name: "Sable Roads",
		x: 78,
		y: 40,
		dossier: "Deep-water roads and the home anchorage of Sable Line, a commercial neighbor of Virelle. The rumor mill already mentions them. Geography does not make a rumor true. No case record is stored on this chart."
	},
	{
		id: "virelle",
		code: "VH",
		name: "Virelle Harbor",
		x: 40,
		y: 48,
		incident: true,
		dossier: "Industrial harbor on the Cinder Coast. Tonight the apron is dark and MV Kestrel is holding offshore. The case file lives on the desk, not on this reference chart."
	},
	{
		id: "cinder",
		code: "CR",
		name: "Cinder Reach",
		x: 22,
		y: 74,
		dossier: "Old smelter coast, stacks unlit, a navigation nuisance and nothing more tonight. Ships give it room. It is not part of the shutdown."
	}
];
function hypothesisById(id) {
	const found = HYPOTHESES.find((item) => item.id === id);
	if (!found) throw new Error(`Unknown hypothesis ${id}`);
	return found;
}
function siteById(id) {
	const found = SITES.find((item) => item.id === id);
	if (!found) throw new Error(`Unknown site ${id}`);
	return found;
}
function evidenceById(id) {
	const found = EVIDENCE.find((item) => item.id === id);
	if (!found) throw new Error(`Unknown evidence ${id}`);
	return found;
}
function createInitialState() {
	return {
		phase: "briefing",
		minutesLeft: 120,
		inspected: [],
		inquiries: [],
		working: null,
		alternative: null,
		confidence: null,
		log: []
	};
}
function spent(state) {
	return 120 - state.minutesLeft;
}
function withLog(state, message, next) {
	return {
		...next,
		log: [...state.log, {
			minutesSpent: spent(next),
			message
		}]
	};
}
function reduce(state, action) {
	if (state.phase === "debrief") return {
		state,
		message: "The assessment is already filed."
	};
	switch (action.type) {
		case "begin":
			if (state.phase !== "briefing") return {
				state,
				message: "The desk is already open."
			};
			return {
				state: withLog(state, "Case opened. The plot is live.", {
					...state,
					phase: "investigating"
				}),
				message: `120 minutes on the desk. Looking is free. A record costs time.`
			};
		case "inspect":
			if (state.phase !== "investigating") return {
				state,
				message: "Open the case before framing a location."
			};
			if (state.inspected.includes(action.siteId)) return {
				state,
				message: "That location is already on your plot."
			};
			return {
				state: withLog(state, `Framed ${siteById(action.siteId).name}.`, {
					...state,
					inspected: [...state.inspected, action.siteId]
				}),
				message: "Location framed. Pull a record if you want one."
			};
		case "inquire": {
			if (state.phase !== "investigating") return {
				state,
				message: "Open the case before pulling a record."
			};
			const inquiry = INQUIRIES.find((item) => item.id === action.inquiryId);
			if (!inquiry) return {
				state,
				message: "That request is not on the desk."
			};
			if (!state.inspected.includes(inquiry.siteId)) return {
				state,
				message: "Frame the location before you task a record there."
			};
			if (state.inquiries.includes(inquiry.id)) return {
				state,
				message: "That record is already in the file."
			};
			if (inquiry.cost > state.minutesLeft) return {
				state,
				message: `${inquiry.title} needs ${inquiry.cost} minutes. You have ${state.minutesLeft} left.`
			};
			const next = withLog(state, `Filed: ${inquiry.title}.`, {
				...state,
				minutesLeft: state.minutesLeft - inquiry.cost,
				inquiries: [...state.inquiries, inquiry.id]
			});
			return {
				state: next,
				message: `Record filed: ${inquiry.title}. ${next.minutesLeft} minutes left.`
			};
		}
		case "working": {
			if (state.phase !== "investigating") return {
				state,
				message: "Open the case before you name a reading."
			};
			const label = hypothesisById(action.hypothesisId).label;
			const alternative = state.alternative === action.hypothesisId ? null : state.alternative;
			return {
				state: withLog(state, `Working reading: ${label}.`, {
					...state,
					working: action.hypothesisId,
					alternative
				}),
				message: `Working reading: ${label}.${state.alternative === action.hypothesisId ? " The previous alternative was cleared." : ""}`
			};
		}
		case "alternative": {
			if (state.phase !== "investigating") return {
				state,
				message: "Open the case before you set a reading aside."
			};
			if (!state.working) return {
				state,
				message: "Name a working reading before you set one aside."
			};
			if (state.working === action.hypothesisId) return {
				state,
				message: "The working reading cannot also be the one you set aside."
			};
			const label = hypothesisById(action.hypothesisId).label;
			return {
				state: withLog(state, `Set aside: ${label}.`, {
					...state,
					alternative: action.hypothesisId
				}),
				message: `Set aside: ${label}.`
			};
		}
		case "submit": {
			if (state.phase !== "investigating") return {
				state,
				message: "Open the case before you file."
			};
			if (!state.working || !state.alternative) return {
				state,
				message: "Name a working reading and the reading you are setting aside."
			};
			const label = hypothesisById(state.working).label;
			return {
				state: withLog(state, `Filed ${label} at ${action.confidence} confidence.`, {
					...state,
					phase: "debrief",
					confidence: action.confidence
				}),
				message: "Assessment filed. The harbor master has it."
			};
		}
		default: return {
			state,
			message: "Nothing to do."
		};
	}
}
var useSignal = create((set) => ({
	mode: "case",
	sim: createInitialState(),
	banner: "",
	setMode: (mode) => set({ mode }),
	dispatch: (action) => set((current) => {
		const step = reduce(current.sim, action);
		return {
			sim: step.state,
			banner: step.message
		};
	}),
	restart: () => set({
		mode: "case",
		sim: createInitialState(),
		banner: "Case reset. Same night, empty file."
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonStyles = cva("inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-ink hover:bg-accent/90",
			quiet: "border border-line bg-raised text-fg hover:border-accent",
			ghost: "text-muted hover:bg-raised hover:text-fg"
		},
		block: {
			true: "w-full",
			false: ""
		}
	},
	defaultVariants: {
		variant: "quiet",
		block: false
	}
});
function Button({ variant, block, className, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonStyles({
			variant,
			block
		}), className),
		...props
	});
}
function Pill({ children, tone = "muted" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs", tone === "accent" ? "border-accent/40 bg-accent/15 text-accent" : "border-line bg-raised text-muted"),
		children
	});
}
function Briefing() {
	const dispatch = useSignal((state) => state.dispatch);
	const setMode = useSignal((state) => state.setMode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-accent",
				children: FICTION_NOTE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-muted",
						children: "CASE VRL-02 · THE SILENT HARBOR"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-4xl leading-tight text-balance sm:text-5xl",
						children: "The harbor went dark."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-base leading-relaxed text-pretty text-muted",
						children: "You are Leander Voss, seconded to the Virelle Port Authority for the night. At 02:17 the apron lights, the cranes, and the tracking repeater died together. MV Kestrel, booked at Berth 7 for 03:10, is still holding east of the light. Fog has been thick since 01:40. No one is hurt. The basin is shut."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefBlock, {
						index: "01",
						title: "What you owe the harbor master",
						body: "Name the most likely cause, and say how much confidence the records you actually pull can bear. He will act on your file at the end of your desk time. Confidence is a claim about that file, not about your nerve."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefBlock, {
						index: "02",
						title: "What the desk allows",
						body: `You have 120 minutes. Framing a place on the plot is free. Commissioning a record spends time. You cannot pull every record. File one working reading, name the reading you are setting aside, and choose low, moderate, or high confidence.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefBlock, {
						index: "03",
						title: "What the chart will not do",
						body: "Four readings are already in the street. All four are plausible. None of them is marked on the plot. A single pin is not the answer. Observations and interpretations are labeled so you can tell them apart."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					onClick: () => dispatch({ type: "begin" }),
					children: "Open the desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					onClick: () => setMode("chart"),
					children: "Read the coast chart first"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl text-balance",
				children: "The four readings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-3 divide-y divide-line border-y border-line",
				children: HYPOTHESES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-sm font-medium text-fg",
						children: item.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-sm leading-relaxed text-pretty text-muted",
						children: item.claim
					})]
				}, item.id))
			})] })
		]
	});
}
function BriefBlock({ index, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-lg border border-line bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-accent",
				children: index
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-serif text-xl text-balance",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-pretty text-muted",
				children: body
			})
		]
	});
}
var TRUTH = "isolation";
var GRADE_LABEL = {
	strong: "Sound assessment",
	partial: "Right shape, thin warrant",
	misread: "Plausible, not supported",
	overconfident: "Confidence ahead of the file"
};
var WHAT_HAPPENED = [
	"Best reconstruction, short of a confession or a test of the holds. Night engineer Mara Ellison was badged from the tower to the ring house in the minutes before the lights died. Breaker 4's recorder stores a local manual open under her badge: not a thermal trip, not a remote command.",
	"Quay sensor S-7 had climbed hard just before that. A Noll & Pike work order from the previous afternoon says the sensor was left in BENCH after a filter swap, recommission unsigned. In that mode a duty screen can show a number that is not a concentration. The file has no sample, no smell report, and no injury that would corroborate a release. Kestrel's advance declaration says kiln dust and no dangerous-goods class. A declaration is not a test of the cargo.",
	"The ship's tracking gap matches the fog and the moment the repeater lost power. The fixes on either side are a ship that held, not a track that jumped. Sable boat Moth-3 filed a transfer and an abort at 02:05. The GPS trail the company volunteered stays north of the light. A volunteered trail is weaker than a seized one. Ivo Marr's statement is one pair of eyes, at night, in fog.",
	"Nothing in the file proves what Ellison believed. The manual open, her route, and an alarm she was in a position to see are why a deliberate isolation is the strongest reading. They do not prove her motive. They do not prove the basin was safe."
].join("\n\n");
function has(state, id) {
	return state.inquiries.includes(id);
}
/** Human act at the panel, plus a reason to distrust the alarm. */
function hasWarrant(state) {
	const humanAct = has(state, "breaker-log") || has(state, "scada-origin");
	const sensorStory = has(state, "sensor-dump") || has(state, "work-order");
	return humanAct && sensorStory;
}
function gradeOf(state) {
	if (!state.working || !state.confidence) return "misread";
	if (state.working !== TRUTH) return "misread";
	const warrant = hasWarrant(state);
	if (!warrant && state.confidence === "high") return "overconfident";
	if (!warrant) return "partial";
	if (state.confidence === "low") return "partial";
	return "strong";
}
function confidenceNote(state, grade) {
	const confidence = state.confidence;
	if (grade === "strong" && confidence === "moderate") return "Moderate confidence matches a file that supports the operational reading and still has no confession and no test of the cargo.";
	if (grade === "strong" && confidence === "high") return "High confidence is defensible as confidence in the operational reading. You had a local human act and a reason the alarm could lie. It is not confidence in an unspoken motive.";
	if (grade === "overconfident") return "High confidence says the file is enough to act as if the question were closed. The records you actually pulled do not contain both the act and the sensor's mode.";
	if (grade === "partial" && confidence === "low") return "Low confidence is honest about the holes. It also tells the master not to move yet.";
	if (grade === "partial") return hasWarrant(state) ? "You had a warrant and still filed it as a low-confidence hunch. The master will wait for someone surer." : "You have one half of the story. A person at a switch, or a lying sensor, is not yet both.";
	if (confidence === "high") return "You filed the weaker reading at high confidence. The master will treat that certainty as part of the mistake.";
	if (confidence === "low") return "Low confidence limits how hard the master leans. It does not repair the reading.";
	return "Moderate confidence still asks the master to prefer this reading over the one you set aside.";
}
function consequences(hypothesis, grade) {
	if (hypothesis === "isolation" && grade === "strong") return "The master orders the ring reclosed under a senior watch, sensor S-7 taken offline, and Kestrel brought in on a documentary check of the declaration rather than a chemical closure. Ellison is stood down from night duty pending review. She is not arrested. The basin loses about four hours.";
	if (hypothesis === "isolation" && grade === "partial") return "The master will not move on a shape he cannot see the warrant for. He holds Kestrel and tasks the missing records himself. The right call arrives after dawn. The basin loses the morning tide. No one is wrongly detained.";
	if (hypothesis === "isolation" && grade === "overconfident") return "The master acts at once, because you sounded finished. The ring comes back, the sensor is quarantined, Ellison is stood down. The review board then compares your confidence with your file and writes that you certified a method and a motive the records you pulled did not both contain. The basin recovers. The certainty does not.";
	if (hypothesis === "sabotage") return "The master keeps the basin closed and has Moth-3's crew met at dawn. If you never placed Ellison at the ring house, that badge trail stays in a drawer while a sweep treats the open breaker as a possible accomplice. Kestrel is diverted toward Sable Roads — the commercial result a sabotage would be for. The crew is released later, with an apology the port will have to mean.";
	if (hypothesis === "failure") return "Maintenance replaces a transformer that did not trip and leaves sensor S-7 in service. If a person opened the breaker by hand, nobody interviews that badge. The fog becomes the official story. The next alarm lands on the same channel.";
	return "The master isolates the port network and calls the control-system vendor. Pilot dispatch waits on a clean network that was not the constraint. A local keypad event, if it is even in your file, sits unexplained while the morning is spent hunting an intruder who left no session. Kestrel holds until the vendor confirms what the historian already stored.";
}
function narrative(state, grade) {
	const working = state.working ? hypothesisById(state.working).label : "No reading";
	const alternative = state.alternative ? hypothesisById(state.alternative).label : "nothing";
	if (grade === "strong") return `You filed ${working} and set ${alternative} aside. The file you pulled contains a local human act at the breaker and a reason the quay alarm could be lying. That is enough to prefer isolation over a trip, a remote command, or a boat in the fog. It is not a completed proof.`;
	if (grade === "overconfident") return `You filed ${working} at high confidence and set ${alternative} aside. The reading can still be the right shape. The file you assembled does not yet earn the tone you used. High confidence, on this desk, is a claim about records, not about instinct.`;
	if (grade === "partial") return `You filed ${working} and set ${alternative} aside. The shape matches the strongest reconstruction. ${hasWarrant(state) ? "You already held both halves and still would not stand on them." : "You have a person, or a suspect sensor, but not both."} The master can use the shape. He cannot treat it as finished.`;
	return `You filed ${working} and set ${alternative} aside. ${working} was a serious candidate. The records that would have strained it, or the records that point at a person at the panel, were either missing or outweighed. The debrief will not pretend the loser was absurd.`;
}
function objection(straining) {
	if (straining.length === 0) return null;
	return `You had already filed a record that strains this reading: ${straining.map((item) => item.title).join("; ")}. That record is not proof of the opposite. It is a live objection your assessment did not absorb.`;
}
function evaluate(state) {
	const confidence = state.confidence;
	const grade = gradeOf(state);
	const working = state.working;
	const supporting = [];
	const straining = [];
	if (working) for (const id of state.inquiries) {
		const evidence = evidenceById(id);
		if (evidence.supports.includes(working)) supporting.push(evidence);
		if (evidence.strains.includes(working)) straining.push(evidence);
	}
	const missed = INQUIRIES.filter((item) => !state.inquiries.includes(item.id)).sort((a, b) => a.priority - b.priority).slice(0, 3).map((item) => ({
		id: item.id,
		note: item.missedNote
	}));
	return {
		grade,
		gradeLabel: GRADE_LABEL[grade],
		headline: headlineFor(grade),
		correct: working === TRUTH,
		narrative: narrative(state, grade),
		confidenceNote: confidence ? confidenceNote(state, grade) : "No confidence was filed.",
		consequences: working ? consequences(working, grade) : "Nothing was filed.",
		objection: objection(straining),
		whatHappened: WHAT_HAPPENED,
		supporting,
		straining,
		missed,
		unusedMinutes: state.minutesLeft
	};
}
function headlineFor(grade) {
	switch (grade) {
		case "strong": return "The record supports the call you filed.";
		case "partial": return "The shape is right. The warrant is not finished.";
		case "overconfident": return "The call may be the right shape. The confidence is not earned.";
		case "misread": return "A serious reading — and the wrong one to act on.";
	}
}
function names(ids) {
	if (ids.length === 0) return "—";
	return ids.map((id) => hypothesisById(id).label).join(" · ");
}
function EvidenceCard({ evidence }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-line bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-xl leading-tight text-balance",
					children: evidence.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
					tone: "accent",
					children: ["Uncertainty ", evidence.uncertainty]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					evidence.timeLabel,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: " · "
					}),
					evidence.provenance
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mt-4 text-xs font-semibold tracking-wide text-accent",
				children: "Observation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed text-pretty",
				children: evidence.observation
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mt-4 text-xs font-semibold tracking-wide text-muted",
				children: "Interpretation · not established"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed text-pretty text-muted",
				children: evidence.interpretation
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid gap-2 border-t border-line pt-3 text-xs sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted",
					children: "Fits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-0.5 text-fg",
					children: names(evidence.supports)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted",
					children: "Strains"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-0.5 text-fg",
					children: names(evidence.strains)
				})] })]
			})
		]
	});
}
function Debrief() {
	const sim = useSignal((state) => state.sim);
	const restart = useSignal((state) => state.restart);
	const setMode = useSignal((state) => state.setMode);
	const report = evaluate(sim);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-accent",
					children: report.gradeLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-4xl leading-tight text-balance",
					children: report.headline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-pretty text-muted",
					children: report.narrative
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-xl",
					children: "What the confidence was worth"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-pretty",
					children: report.confidenceNote
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-xl",
						children: "What the master does with it"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-pretty",
						children: report.consequences
					}),
					report.objection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-pretty text-muted",
						children: report.objection
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted tabular-nums",
						children: [report.unusedMinutes, " minutes were still on the desk when you filed."]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl text-balance",
						children: "The underlying scenario"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-accent",
						children: "Shown only after you file. Uncertain where the file is uncertain."
					}),
					report.whatHappened.split("\n\n").map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-pretty",
						children: paragraph
					}, paragraph.slice(0, 24)))
				]
			}),
			report.supporting.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: "Records that fit your reading"
				}), report.supporting.map((evidence) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceCard, { evidence }, evidence.id))]
			}),
			report.straining.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: "Records that strain it"
				}), report.straining.map((evidence) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceCard, { evidence }, evidence.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-xl",
					children: "Left in the drawer"
				}), report.missed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "You pulled every record the desk can hold."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-3",
					children: report.missed.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-sm leading-relaxed text-pretty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium text-fg",
							children: [evidenceById(item.id).title, ". "]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: item.note
						})]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					onClick: () => restart(),
					children: "Restart the case"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					onClick: () => setMode("chart"),
					children: "Return to the coast chart"
				})]
			})
		]
	});
}
function CoastChart({ selected, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-lg border border-line bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 800 640",
				className: "block h-auto w-full",
				role: "img",
				"aria-label": "Reference chart of the Cinder Coast. Fictional geography.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "800",
						height: "640",
						className: "fill-bg"
					}),
					Array.from({ length: 8 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: index * 100,
						y1: "0",
						x2: index * 100,
						y2: "640",
						className: "stroke-line",
						strokeWidth: "1",
						opacity: "0.4"
					}, index)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0 640 L0 420 C80 400 120 460 180 440 C260 410 280 480 360 500 C440 520 470 430 540 400 C620 360 660 390 800 340 L800 640 Z",
						className: "fill-raised stroke-line",
						strokeWidth: "2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M470 400 C520 280 500 180 560 80",
						className: "fill-none stroke-line",
						strokeWidth: "2",
						strokeDasharray: "5 7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "36",
						y: "600",
						className: "fill-muted",
						style: { fontSize: 13 },
						children: "CINDER COAST"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "620",
						y: "48",
						className: "fill-muted",
						style: { fontSize: 12 },
						children: "N"
					})
				]
			}),
			COAST_REGIONS.map((region) => {
				const active = selected === region.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": active,
					"aria-label": region.name,
					onClick: () => onSelect(region.id),
					className: "absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center",
					style: {
						left: `${region.x}%`,
						top: `${region.y}%`
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("flex size-11 items-center justify-center rounded-full border text-xs font-semibold", active ? "border-accent bg-accent text-accent-ink" : region.incident ? "border-accent bg-raised text-accent" : "border-line bg-surface text-fg"),
						children: region.code
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 max-w-28 text-center text-xs leading-tight text-fg",
						children: region.name
					})]
				}, region.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute bottom-2 left-3 text-xs text-muted",
				children: "Reference geography · not case evidence"
			})
		]
	});
}
function Explorer() {
	const [selected, setSelected] = (0, import_react.useState)("virelle");
	const setMode = useSignal((state) => state.setMode);
	const phase = useSignal((state) => state.sim.phase);
	const region = COAST_REGIONS.find((item) => item.id === selected) ?? COAST_REGIONS[2];
	const caseLabel = phase === "briefing" ? "Read the briefing" : phase === "debrief" ? "Read the debrief" : "Return to the desk";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid w-full max-w-6xl gap-4 px-4 py-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl text-balance",
				children: "Cinder Coast"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: FICTION_NOTE
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoastChart, {
				selected,
				onSelect: setSelected
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex flex-col gap-4 rounded-lg border border-line bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-muted",
					children: "REFERENCE · NOT A RECORD"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl text-balance",
					children: region.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-pretty",
					children: region.dossier
				}),
				region.incident ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					onClick: () => setMode("case"),
					children: caseLabel
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No incident file is open on this stretch."
				})
			]
		})]
	});
}
function siteHasRecord(siteId, inquiries) {
	return INQUIRIES.some((item) => item.siteId === siteId && inquiries.includes(item.id));
}
function HarborChart({ inspected, inquiries, selected, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-lg border border-line bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 800 640",
				className: "block h-auto w-full",
				role: "img",
				"aria-label": "Schematic plot of Virelle Harbor. Not a hydrographic survey.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "800",
						height: "640",
						className: "fill-bg"
					}),
					Array.from({ length: 9 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: 80 + index * 80,
						y1: "0",
						x2: 80 + index * 80,
						y2: "640",
						className: "stroke-line",
						strokeWidth: "1",
						opacity: "0.45"
					}, `v${index}`)),
					Array.from({ length: 7 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "0",
						y1: 40 + index * 90,
						x2: "800",
						y2: 40 + index * 90,
						className: "stroke-line",
						strokeWidth: "1",
						opacity: "0.45"
					}, `h${index}`)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0 640 L0 250 L90 230 L150 280 L210 250 C270 220 300 290 360 310 L430 330 L455 400 L540 370 L590 450 L700 470 L800 520 L800 640 Z",
						className: "fill-raised stroke-line",
						strokeWidth: "2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M30 210 Q180 90 340 150",
						className: "fill-none stroke-fg",
						strokeWidth: "8",
						strokeLinecap: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M30 210 Q180 90 340 150",
						className: "fill-none stroke-bg",
						strokeWidth: "2",
						strokeLinecap: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "455",
						y: "300",
						width: "28",
						height: "110",
						className: "fill-surface stroke-line",
						strokeWidth: "2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "620",
						cy: "100",
						r: "36",
						className: "fill-none stroke-line",
						strokeDasharray: "4 6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "48",
						y: "610",
						className: "fill-muted",
						style: { fontSize: 13 },
						children: "VIRELLE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "600",
						y: "150",
						className: "fill-muted",
						style: { fontSize: 12 },
						children: "11"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "500",
						y: "220",
						className: "fill-muted",
						style: { fontSize: 12 },
						children: "7.4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "250",
						y: "160",
						className: "fill-muted",
						style: { fontSize: 12 },
						children: "6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "700",
						y: "40",
						className: "fill-muted",
						style: { fontSize: 12 },
						children: "N"
					})
				]
			}),
			SITES.map((site) => {
				const open = inspected.includes(site.id);
				const filed = siteHasRecord(site.id, inquiries);
				const active = selected === site.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": active,
					"aria-label": `${site.name}${filed ? ", record filed" : open ? ", framed" : ""}`,
					onClick: () => onSelect(site.id),
					className: "absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center",
					style: {
						left: `${site.x}%`,
						top: `${site.y}%`
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("flex size-11 items-center justify-center rounded-full border text-xs font-semibold", active && "border-accent bg-accent text-accent-ink", !active && filed && "border-accent bg-raised text-accent", !active && !filed && open && "border-fg bg-surface text-fg", !active && !filed && !open && "border-line bg-bg text-muted"),
						children: site.code
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 hidden max-w-24 text-center text-xs leading-tight text-fg sm:block",
						children: site.name
					})]
				}, site.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute bottom-2 left-3 right-3 text-xs text-muted",
				children: "Schematic plot · not a survey · pins are places, not answers"
			})
		]
	});
}
var TABS = [
	{
		id: "plot",
		label: "Plot"
	},
	{
		id: "file",
		label: "File"
	},
	{
		id: "time",
		label: "Timeline"
	},
	{
		id: "assess",
		label: "Assess"
	}
];
function Investigation() {
	const sim = useSignal((state) => state.sim);
	const dispatch = useSignal((state) => state.dispatch);
	const [tab, setTab] = (0, import_react.useState)("plot");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [confidence, setConfidence] = (0, import_react.useState)(null);
	const [confirming, setConfirming] = (0, import_react.useState)(false);
	const site = selected ? siteById(selected) : null;
	const siteInquiries = INQUIRIES.filter((item) => item.siteId === selected);
	const records = sim.inquiries.map((id) => evidenceById(id)).sort((a, b) => a.t - b.t);
	function frame(siteId) {
		setSelected(siteId);
		setTab("plot");
		if (!sim.inspected.includes(siteId)) dispatch({
			type: "inspect",
			siteId
		});
	}
	const fileReason = !sim.working ? "Name a working reading." : !sim.alternative ? "Name the reading you are setting aside." : !confidence ? "Choose a confidence." : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 lg:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl text-balance",
					children: "The Silent Harbor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Pull records. Keep two readings in play. File only what the file can bear."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-serif text-3xl tabular-nums text-accent",
					"aria-live": "polite",
					children: [sim.minutesLeft, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 font-sans text-sm text-muted",
						children: "min left"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				"aria-label": "Case desk",
				className: "flex gap-2 overflow-x-auto",
				children: TABS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": tab === item.id,
					onClick: () => setTab(item.id),
					className: cn("min-h-11 shrink-0 rounded-lg border px-4 text-sm", tab === item.id ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-fg"),
					children: [item.label, item.id === "file" ? ` · ${records.length}` : ""]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: tab === "plot" ? "block" : "hidden lg:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HarborChart, {
						inspected: sim.inspected,
						inquiries: sim.inquiries,
						selected,
						onSelect: frame
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden",
						children: SITES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => frame(item.id),
							className: cn("min-h-11 shrink-0 rounded-lg border px-3 text-sm", selected === item.id ? "border-accent bg-raised text-accent" : "border-line bg-surface text-fg"),
							children: [
								item.code,
								" ",
								item.name
							]
						}, item.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						tab === "plot" && !site && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-lg border border-dashed border-line bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-xl",
								children: "Choose a place"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-pretty text-muted",
								children: "Framing a location is free. Pulling a record spends desk time. Nothing on the plot is marked as the answer."
							})]
						}),
						tab === "plot" && site && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex flex-col gap-4 rounded-lg border border-line bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-widest text-muted",
									children: "LOCATION"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-2xl text-balance",
									children: site.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-pretty",
									children: site.summary
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-2",
								children: sim.inspected.includes(site.id) ? siteInquiries.map((inquiry) => {
									const done = sim.inquiries.includes(inquiry.id);
									const short = !done && inquiry.cost > sim.minutesLeft;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										block: true,
										variant: done ? "ghost" : "quiet",
										disabled: done || short,
										onClick: () => dispatch({
											type: "inquire",
											inquiryId: inquiry.id
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex w-full items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: done ? inquiry.title : inquiry.question }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "shrink-0 tabular-nums text-muted",
												children: done ? "Filed" : `${inquiry.cost} min`
											})]
										})
									}), short && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted",
										children: [
											"Needs ",
											inquiry.cost,
											" minutes. You have ",
											sim.minutesLeft,
											"."
										]
									})] }, inquiry.id);
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									block: true,
									variant: "primary",
									onClick: () => frame(site.id),
									children: "Frame this location"
								}) })
							})]
						}),
						tab === "file" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "flex flex-col gap-3",
							children: records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
								title: "The file is empty",
								body: "The briefing is not evidence. Frame a place and pull a record. Each card separates what was recorded from what it might mean."
							}) : records.map((evidence) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceCard, { evidence }, evidence.id))
						}),
						tab === "time" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "flex flex-col gap-3 border-l border-line pl-4",
								children: [...SITREP.map((beat) => ({
									key: `s-${beat.t}`,
									t: beat.t,
									timeLabel: beat.timeLabel,
									kicker: "Situation",
									title: beat.text,
									detail: "Given in the briefing. Not a record you pulled."
								})), ...records.map((evidence) => ({
									key: evidence.id,
									t: evidence.t,
									timeLabel: evidence.timeLabel,
									kicker: "Record",
									title: evidence.title,
									detail: evidence.observation
								}))].sort((a, b) => a.t - b.t).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[1.2rem] top-1.5 size-2 rounded-full bg-accent" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-accent",
											children: [
												row.timeLabel,
												" · ",
												row.kicker
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm leading-relaxed text-pretty",
											children: row.title
										}),
										row.kicker === "Record" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm leading-relaxed text-pretty text-muted",
											children: row.detail
										})
									]
								}, row.key))
							}), sim.log.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-line bg-surface p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-medium",
									children: "Desk log"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-2 flex flex-col gap-1 text-sm text-muted",
									children: sim.log.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular-nums text-fg",
											children: [entry.minutesSpent, " min"]
										}),
										" · ",
										entry.message
									] }, `${entry.minutesSpent}-${index}`))
								})]
							})]
						}),
						tab === "assess" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-pretty text-muted",
									children: "The file does not rank these. Each record says what it fits and what it strains. A fit is not a verdict, and a strain is an objection, not a disproof. Name the reading you will file and the one you are setting aside."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "flex flex-col gap-3",
									children: HYPOTHESES.map((item) => {
										const working = sim.working === item.id;
										const aside = sim.alternative === item.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "rounded-lg border border-line bg-surface p-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "font-serif text-xl",
															children: item.label
														}),
														working && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
															tone: "accent",
															children: "Working"
														}),
														aside && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: "Set aside" })
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-sm leading-relaxed text-pretty text-muted",
													children: item.claim
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3 flex flex-col gap-2 sm:flex-row",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: working ? "primary" : "quiet",
														onClick: () => dispatch({
															type: "working",
															hypothesisId: item.id
														}),
														children: "Use this reading"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														disabled: !sim.working || working,
														onClick: () => dispatch({
															type: "alternative",
															hypothesisId: item.id
														}),
														children: "Set this aside"
													})]
												})
											]
										}, item.id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
									className: "rounded-lg border border-line bg-surface p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
										className: "px-1 text-sm font-medium",
										children: "Confidence in the file"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 grid grid-cols-3 gap-2",
										children: [
											"low",
											"moderate",
											"high"
										].map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-pressed": confidence === level,
											onClick: () => setConfidence(level),
											className: cn("min-h-11 rounded-lg border capitalize", confidence === level ? "border-accent bg-accent text-accent-ink" : "border-line bg-bg text-fg"),
											children: level
										}, level))
									})]
								}),
								fileReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: fileReason
								}),
								confirming && sim.working && sim.alternative && confidence ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-accent/50 bg-surface p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm leading-relaxed text-pretty",
										children: [
											"File ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: hypothesisById(sim.working).label }),
											" at ",
											confidence,
											" ",
											"confidence, and set aside",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: hypothesisById(sim.alternative).label }),
											".",
											" ",
											sim.minutesLeft,
											" minutes will go unused. You cannot add records after this."
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-col gap-2 sm:flex-row",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "primary",
											onClick: () => dispatch({
												type: "submit",
												confidence
											}),
											children: "File the assessment"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "quiet",
											onClick: () => setConfirming(false),
											children: "Keep working"
										})]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "primary",
									disabled: Boolean(fileReason),
									onClick: () => setConfirming(true),
									children: "Review and file"
								})
							]
						})
					]
				})]
			})
		]
	});
}
function Empty({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-dashed border-line bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-serif text-xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-pretty text-muted",
			children: body
		})]
	});
}
function SignalEarth() {
	const mode = useSignal((state) => state.mode);
	const phase = useSignal((state) => state.sim.phase);
	const banner = useSignal((state) => state.banner);
	const minutes = useSignal((state) => state.sim.minutesLeft);
	const setMode = useSignal((state) => state.setMode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-lg leading-none tracking-wide",
						children: "SIGNAL EARTH"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Cinder Coast · fictional"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-2",
						"aria-label": "Modes",
						children: [
							mode === "case" && phase === "investigating" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mr-1 hidden text-sm tabular-nums text-muted sm:inline",
								children: [minutes, " min"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": mode === "chart",
								onClick: () => setMode("chart"),
								className: cn("min-h-11 rounded-lg border px-4 text-sm", mode === "chart" ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-fg"),
								children: "Chart"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": mode === "case",
								onClick: () => setMode("case"),
								className: cn("min-h-11 rounded-lg border px-4 text-sm", mode === "case" ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-fg"),
								children: "Case"
							})
						]
					})]
				}), banner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					className: "border-t border-line px-4 py-2 text-sm text-pretty text-fg lg:px-6",
					children: banner
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: mode === "chart" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Explorer, {}) : phase === "briefing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefing, {}) : phase === "debrief" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Debrief, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Investigation, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto w-full max-w-6xl px-4 py-8 text-xs text-muted lg:px-6",
				children: [FICTION_NOTE, " Leaving the case does not erase the desk. Restart does."]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalEarth, {});
}
//#endregion
export { Home as component };
