import type { PermutationResult } from "../types/types";

class MetricsService {
   private static readonly BASE_URL = "http://localhost:8080/api/metrics";

   static async getCookMetrics() {
      try {
         const response = await fetch(`${this.BASE_URL}/cook`, {
            method: "GET",
         });

         if (!response.ok) {
            throw new Error("Failed to fetch ");
         }

         return await response.json();
      } catch (error) {
         console.error("MetricsService.getCookMetrics error:", error);
         throw error;
      }
   }

   static async getExpertsStatistics(metricData: PermutationResult[]) {
      try {
         const response = await fetch(`${this.BASE_URL}/getExpertsStatistics`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(metricData),
         });

         if (!response.ok) {
            throw new Error("Failed to fetch ");
         }

         return await response.json();
      } catch (error) {
         console.error("MetricsService.getExpertsStatistics error:", error);
         throw error;
      }
   }
}

export default MetricsService;
