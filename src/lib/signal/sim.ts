import {
  hypothesisById,
  inquiryById,
  INQUIRIES,
  siteById,
  type Confidence,
  type HypothesisId,
  type InquiryId,
  type SiteId,
} from "./content.ts";

/** Desk time the harbor master will wait. Looking at the plot is free. */
export const DESK_MINUTES = 120;

export type Phase = "briefing" | "investigating" | "debrief";

export interface LogEntry {
  minutesSpent: number;
  message: string;
}

export interface SimState {
  phase: Phase;
  minutesLeft: number;
  inspected: SiteId[];
  inquiries: InquiryId[];
  working: HypothesisId | null;
  alternative: HypothesisId | null;
  confidence: Confidence | null;
  log: LogEntry[];
}

export type Action =
  | { type: "begin" }
  | { type: "inspect"; siteId: SiteId }
  | { type: "inquire"; inquiryId: InquiryId }
  | { type: "working"; hypothesisId: HypothesisId }
  | { type: "alternative"; hypothesisId: HypothesisId }
  | { type: "submit"; confidence: Confidence };

export interface Step {
  state: SimState;
  message: string;
}

export function createInitialState(): SimState {
  return {
    phase: "briefing",
    minutesLeft: DESK_MINUTES,
    inspected: [],
    inquiries: [],
    working: null,
    alternative: null,
    confidence: null,
    log: [],
  };
}

function spent(state: SimState): number {
  return DESK_MINUTES - state.minutesLeft;
}

function withLog(state: SimState, message: string, next: SimState): SimState {
  return {
    ...next,
    log: [...state.log, { minutesSpent: spent(next), message }],
  };
}

export function reduce(state: SimState, action: Action): Step {
  if (state.phase === "debrief") {
    return { state, message: "The assessment is already filed." };
  }

  switch (action.type) {
    case "begin": {
      if (state.phase !== "briefing") {
        return { state, message: "The desk is already open." };
      }
      const next = withLog(state, "Case opened. The plot is live.", {
        ...state,
        phase: "investigating",
      });
      return {
        state: next,
        message: `${DESK_MINUTES} minutes on the desk. Looking is free. A record costs time.`,
      };
    }
    case "inspect": {
      if (state.phase !== "investigating") {
        return { state, message: "Open the case before framing a location." };
      }
      if (state.inspected.includes(action.siteId)) {
        return { state, message: "That location is already on your plot." };
      }
      const next = withLog(state, `Framed ${siteById(action.siteId).name}.`, {
        ...state,
        inspected: [...state.inspected, action.siteId],
      });
      return { state: next, message: "Location framed. Pull a record if you want one." };
    }
    case "inquire": {
      if (state.phase !== "investigating") {
        return { state, message: "Open the case before pulling a record." };
      }
      const inquiry = INQUIRIES.find((item) => item.id === action.inquiryId);
      if (!inquiry) return { state, message: "That request is not on the desk." };
      if (!state.inspected.includes(inquiry.siteId)) {
        return { state, message: "Frame the location before you task a record there." };
      }
      if (state.inquiries.includes(inquiry.id)) {
        return { state, message: "That record is already in the file." };
      }
      if (inquiry.cost > state.minutesLeft) {
        return {
          state,
          message: `${inquiry.title} needs ${inquiry.cost} minutes. You have ${state.minutesLeft} left.`,
        };
      }
      const next = withLog(state, `Filed: ${inquiry.title}.`, {
        ...state,
        minutesLeft: state.minutesLeft - inquiry.cost,
        inquiries: [...state.inquiries, inquiry.id],
      });
      return {
        state: next,
        message: `Record filed: ${inquiry.title}. ${next.minutesLeft} minutes left.`,
      };
    }
    case "working": {
      if (state.phase !== "investigating") {
        return { state, message: "Open the case before you name a reading." };
      }
      const label = hypothesisById(action.hypothesisId).label;
      const alternative =
        state.alternative === action.hypothesisId ? null : state.alternative;
      const next = withLog(state, `Working reading: ${label}.`, {
        ...state,
        working: action.hypothesisId,
        alternative,
      });
      const cleared =
        state.alternative === action.hypothesisId
          ? " The previous alternative was cleared."
          : "";
      return { state: next, message: `Working reading: ${label}.${cleared}` };
    }
    case "alternative": {
      if (state.phase !== "investigating") {
        return { state, message: "Open the case before you set a reading aside." };
      }
      if (!state.working) {
        return { state, message: "Name a working reading before you set one aside." };
      }
      if (state.working === action.hypothesisId) {
        return { state, message: "The working reading cannot also be the one you set aside." };
      }
      const label = hypothesisById(action.hypothesisId).label;
      const next = withLog(state, `Set aside: ${label}.`, {
        ...state,
        alternative: action.hypothesisId,
      });
      return { state: next, message: `Set aside: ${label}.` };
    }
    case "submit": {
      if (state.phase !== "investigating") {
        return { state, message: "Open the case before you file." };
      }
      if (!state.working || !state.alternative) {
        return {
          state,
          message: "Name a working reading and the reading you are setting aside.",
        };
      }
      const label = hypothesisById(state.working).label;
      const next = withLog(
        state,
        `Filed ${label} at ${action.confidence} confidence.`,
        {
          ...state,
          phase: "debrief",
          confidence: action.confidence,
        },
      );
      return { state: next, message: "Assessment filed. The harbor master has it." };
    }
    default:
      return { state, message: "Nothing to do." };
  }
}

export function replay(actions: readonly Action[]): SimState {
  return actions.reduce((state, action) => reduce(state, action).state, createInitialState());
}

export function collectedEvidenceIds(state: SimState): InquiryId[] {
  return state.inquiries.map((id) => inquiryById(id).evidenceId);
}
