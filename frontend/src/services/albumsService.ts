import type { Album } from "../types/types";

export default class AlbumsService {
   private static readonly BASE_URL = `http://localhost:8080/api/albums`;

   static async setAlbums(albums: Album[]) {
      try {
         const response = await fetch(`${this.BASE_URL}/setAlbums`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(albums),
         });

         if (!response.ok) {
            throw new Error("Failed to add albums");
         }

         return await response.json();
      } catch (error) {
         console.error("AlbumsService.addAlbums error:", error);
         throw error;
      }
   }

   static async fetchAlbums(): Promise<Album[]> {
      try {
         const response = await fetch(`${this.BASE_URL}/`, {
            method: "GET",
         });

         if (!response.ok) {
            throw new Error("Failed to get albums");
         }

         return await response.json();
      } catch (error) {
         console.error("AlbumsService.fetchAlbums error:", error);
         throw error;
      }
   }
}
