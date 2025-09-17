import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExpertsStore {
   expertsIdx: number[];
   currentExpertId: number;
   addExperts: (amount: number) => void;
   setCurrentExpertId: (id: number) => void;
}

export const useExpertsStore = create<ExpertsStore>()(
   persist(
      (set) => ({
         expertsIdx: [],
         currentExpertId: 0,
         addExperts: (amount) => {
            const experts = Array.from({ length: amount }, (_, i) => i);
            set({
               expertsIdx: experts,
               currentExpertId: experts[0] ?? 0,
            });
         },
         setCurrentExpertId: (id) => set({ currentExpertId: id }),
      }),
      {
         name: "experts-storage",
      }
   )
);
