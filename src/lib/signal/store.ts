import { create } from "zustand";
import { createInitialState, reduce, type Action, type SimState } from "./sim.ts";

export type Mode = "chart" | "case";

interface SignalStore {
  mode: Mode;
  sim: SimState;
  banner: string;
  setMode: (mode: Mode) => void;
  dispatch: (action: Action) => void;
  restart: () => void;
}

export const useSignal = create<SignalStore>((set) => ({
  mode: "case",
  sim: createInitialState(),
  banner: "",
  setMode: (mode) => set({ mode }),
  dispatch: (action) =>
    set((current) => {
      const step = reduce(current.sim, action);
      return { sim: step.state, banner: step.message };
    }),
  restart: () =>
    set({
      mode: "case",
      sim: createInitialState(),
      banner: "Case reset. Same night, empty file.",
    }),
}));
