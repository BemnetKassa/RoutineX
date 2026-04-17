import { create } from "zustand";
import { Routine } from "../models/Routine";

interface Store {
  routines: Routine[];
  setRoutines: (data: Routine[]) => void;
}

export const useRoutineStore = create<Store>((set) => ({
  routines: [],
  setRoutines: (data) => set({ routines: data }),
}));
