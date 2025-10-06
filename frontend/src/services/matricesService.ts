export default class MatricesService {
   private static readonly BASE_URL = `http://localhost:8080/api/matrices`;

   static async addMatrix(matrix: number[][]) {
      try {
         const response = await fetch(`${this.BASE_URL}/addMatrix`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ matrix }),
         });

         if (!response.ok) {
            throw new Error("Failed to add matrix");
         }

         return await response.json();
      } catch (error) {
         console.error("MatricesService.addMatrix error:", error);
         throw error;
      }
   }

   static async getRankedAlbums() {
      try {
         const response = await fetch(`${this.BASE_URL}/getRankedAlbums`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
         });

         if (!response.ok) {
            throw new Error("Failed to get ranked matrix");
         }

         return await response.json();
      } catch (error) {
         console.error("MatricesService.getRankedAlbums error:", error);
         return null;
      }
   }

   static async removeAll() {
      try {
         const response = await fetch(`${this.BASE_URL}/removeAll`, {
            method: "DELETE",
      });

         if (!response.ok) {
            throw new Error("Failed to delete all matrices");
         }

         return await response.json();
      } catch (error) {
         console.error("MatricesService.removeAll error:", error);
         return null;
      }
   }
}
