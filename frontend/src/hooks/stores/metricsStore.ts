import { create } from "zustand";
import { persist } from "zustand/middleware";
import MetricsService from "../../services/metricsService";

const STORE_NAME = "matrices-storage";

interface Store {
   cookMetrics: {};
   getCookMetrics: () => void;
}

export const useMetricsStore = create<Store>()(
   persist(
      (set) => ({
         cookMetrics: {},
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
