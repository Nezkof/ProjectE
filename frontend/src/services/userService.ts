const BASE_URL = `http://localhost:8080/api/users`;

export async function fetchUserAPI() {
   try {
      const res = await fetch(`${BASE_URL}/me`, {
         credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      return await res.json();
   } catch (err) {
      console.error(err);
      return null;
   }
}

export async function fetchUsers() {
   try {
      const res = await fetch(`${BASE_URL}/all`, {
         method: "GET",
      });

      if (!res.ok) throw new Error("Error");
      return await res.json();
   } catch (err) {
      console.error(err);
      return null;
   }
}

export const UserService = { fetchUserAPI, fetchUsers };
