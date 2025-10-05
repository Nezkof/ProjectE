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

   static async getHammingMetrics(id1: string, id2: string) {
      try {
         const response = await fetch(`${this.BASE_URL}/hamming`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ id1, id2 }),
         });

         if (!response.ok) {
            throw new Error("Failed to fetch ");
         }

         return await response.json();
      } catch (error) {
         console.error("MetricsService.getHammingMetrics error:", error);
         throw error;
      }
   }
}

export default MetricsService;
