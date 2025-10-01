import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Expert } from "../../types/types";

interface ExpertsStore {
   experts: Expert[];
   currentExpertId: number;
   addExpert: (amount: Expert) => void;
   clearExperts: () => void;
   setCurrentExpertId: (id: number) => void;
}

export const useExpertsStore = create<ExpertsStore>()(
   persist(
      (set) => ({
         experts: [],
         currentExpertId: 0,
         addExpert: (expert: Expert) => {
            set((state) => ({
               experts: [...state.experts, expert],
            }));
         },
         setCurrentExpertId: (id) => set({ currentExpertId: id }),
         clearExperts: () => set({ experts: [] }),
      }),
      {
         name: "experts-storage",
      }
   )
);
