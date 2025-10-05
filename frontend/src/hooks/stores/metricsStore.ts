import { create } from "zustand";
import { persist } from "zustand/middleware";
import MetricsService from "../../services/metricsService";
import type { PermutationResult } from "../../types/types";

const STORE_NAME = "matrices-storage";

interface Store {
   cookMetrics: {
      additiveRankingIndex: 0;
      minmaxRankingIndex: 0;
      permutationResults: PermutationResult[];
   };
   getCookMetrics: () => void;
}

export const useMetricsStore = create<Store>()(
   persist(
      (set) => ({
         cookMetrics: {
            additiveRankingIndex: 0,
            minmaxRankingIndex: 0,
            permutationResults: [],
         },
         getCookMetrics: async () => {
            const cookMetrics = await MetricsService.getCookMetrics();
            set({ cookMetrics: cookMetrics });
         },
      }),
      {
         name: STORE_NAME,
      }
   )
);
