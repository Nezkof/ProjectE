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
   hammingMetric: {
      vector1: number[];
      vector2: number[];
      diffs: number[];
   };
   getCookMetrics: () => Promise<void>;
   getHammingMetrics: (id1: string, id2: string) => void;
}

export const useMetricsStore = create<Store>()(
   persist(
      (set) => ({
         cookMetrics: {
            additiveRankingIndex: 0,
            minmaxRankingIndex: 0,
            permutationResults: [],
         },
         hammingMetric: {
            vector1: [],
            vector2: [],
            diffs: [],
         },
         getCookMetrics: async () => {
            const cookMetrics = await MetricsService.getCookMetrics();
            set({ cookMetrics: cookMetrics });
         },

         getHammingMetrics: async (id1: string, id2: string) => {
            const hammingMetric = await MetricsService.getHammingMetrics(id1, id2);
            set({ hammingMetric: hammingMetric });
         },
      }),
      {
         name: STORE_NAME,
      }
   )
);
