const BASE_URL = `http://localhost:8080/api/matrices`;

export async function addMatrix(matrix: number[][]) {
   try {
      const response = await fetch(`${BASE_URL}/addMatrix`, {
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

export async function getRankedAlbums() {
   try {
      const response = await fetch(`${BASE_URL}/getRankedAlbums`, {
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
