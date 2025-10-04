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
}

export default MetricsService;
