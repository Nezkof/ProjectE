const BASE_URL = `http://localhost:8080`;

export async function logout() {
   try {
      const res = await fetch(`${BASE_URL}/auth/logout`, {
         credentials: "include",
      });
      if (!res.ok) throw new Error("Logout failed");
      return await res.json();
   } catch (err) {
      console.error(err);
      return null;
   }
}

export const authService = { logout };
