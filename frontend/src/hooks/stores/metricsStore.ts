import { create } from "zustand";
import { persist } from "zustand/middleware";
import MetricsService from "../../services/metricsService";
import type { PermutationResult } from "../../types/types";

const STORE_NAME = "matrices-storage";

interface Store {
   metrics: PermutationResult[][];
   getCookMetrics: () => Promise<void>;
}

export const useMetricsStore = create<Store>()(
   persist(
      (set) => ({
         metrics: [],
         getCookMetrics: async () => {
            const metrics = await MetricsService.getCookMetrics();
            set({
               metrics: [
                  metrics.additiveCookResults,
                  metrics.minmaxCookResults,
                  metrics.additiveHammingResults,
                  metrics.minmaxHammingResults,
               ],
            });
         },
      }),
      {
         name: STORE_NAME,
      }
   )
);
