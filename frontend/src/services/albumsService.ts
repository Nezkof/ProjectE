import type { Album } from "../types/types";

const BASE_URL = `http://localhost:8080/api/albums`;

export async function addAlbums(albums: Album[]) {
   try {
      const response = await fetch(`${BASE_URL}/addAlbums`, {
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

export async function fetchAlbums(): Promise<Album[]> {
   try {
      const response = await fetch(`${BASE_URL}/`, {
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
