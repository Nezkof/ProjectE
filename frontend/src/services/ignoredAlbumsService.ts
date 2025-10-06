class IgnoredAlbumsService {
   private static readonly BASE_URL = "http://localhost:8080/api/ignoredAlbums";

   static async add(albumId: number) {
      try {
         const response = await fetch(`${this.BASE_URL}/add`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ albumId }),
         });

         if (!response.ok) {
            throw new Error("Failed to add album");
         }

         return await response.json();
      } catch (error) {
         console.error("IgnoredAlbumsService.add error:", error);
         throw error;
      }
   }

   static async remove(albumId: number) {
      try {
         const response = await fetch(`${this.BASE_URL}/remove`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ albumId }),
         });

         if (!response.ok) throw new Error("Failed to remove album");
         return await response.json();
      } catch (error) {
         console.error("IgnoredAlbumsService.remove error:", error);
         throw error;
      }
   }

   static async removeMany(albumIds: number[]) {
      try {
         const response = await fetch(`${this.BASE_URL}/removeMany`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ albumIds }),
         });

         if (!response.ok) throw new Error("Failed to remove albums");
         return await response.json();
      } catch (error) {
         console.error("IgnoredAlbumsService.removeMany error:", error);
         throw error;
      }
   }

   static async getAll() {
      try {
         const response = await fetch(`${this.BASE_URL}/all`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
         });

         if (!response.ok) throw new Error("Failed to fetch albums");
         return await response.json();
      } catch (error) {
         console.error("IgnoredAlbumsService.getAll error:", error);
         throw error;
      }
   }

   static async getById() {
      try {
         const response = await fetch(`${this.BASE_URL}/getByUserId`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
         });

         if (!response.ok) throw new Error("Failed to fetch albums");
         return await response.json();
      } catch (error) {
         console.error("IgnoredAlbumsService.getById error:", error);
         throw error;
      }
   }

   static async removeAll() {
      try {
         const response = await fetch(`${this.BASE_URL}/removeAll`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw new Error("Failed to delete all ignored albums");
         }

         return await response.json();
      } catch (error) {
         console.error("IgnoredAlbumsService.removeAll error:", error);
         return null;
      }
   }
}

export default IgnoredAlbumsService;
