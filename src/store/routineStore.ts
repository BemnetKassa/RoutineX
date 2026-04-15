import { create } from "zustand";

interface Routine {
  id: number;
  title: string;
  description: string;
  time: string;
}

interface Store {
  routines: Routine[];
  setRoutines: (data: Routine[]) => void;
}

export const useRoutineStore = create<Store>((set) => ({
  routines: [],
  setRoutines: (data) => set({ routines: data }),
}));
