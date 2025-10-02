const BASE_URL = `http://localhost:8080/api/ignoredAlbums`;

export async function add(albumId: number) {
   try {
      const response = await fetch(`${BASE_URL}/add`, {
         method: "POST",
         credentials: "include",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ albumId }),
      });

      if (!response.ok) {
         throw new Error("Failed to add albums");
      }

      return await response.json();
   } catch (error) {
      console.error("AlbumsService.add error:", error);
      throw error;
   }
}

export async function remove(albumId: number) {
   try {
      const response = await fetch(`${BASE_URL}/remove`, {
         method: "POST",
         credentials: "include",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ albumId }),
      });

      if (!response.ok) throw new Error("Failed to remove album");
      return await response.json();
   } catch (error) {
      console.error("AlbumsService.remove error:", error);
      throw error;
   }
}

export async function getAll() {
   try {
      const response = await fetch(`${BASE_URL}/all`, {
         method: "GET",
         headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to remove album");
      return await response.json();
   } catch (error) {
      console.error("AlbumsService.remove error:", error);
      throw error;
   }
}

export async function isIgnoredByUser(albumId: number) {
   try {
      const response = await fetch(`${BASE_URL}/${albumId}/isIgnored`, {
         method: "GET",
         credentials: "include",
         headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to check isIgnoredByUser album");
      return await response.json();
   } catch (error) {
      console.error("AlbumsService.isIgnoredByUser error:", error);
      throw error;
   }
}
