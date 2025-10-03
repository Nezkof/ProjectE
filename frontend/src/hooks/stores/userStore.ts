import { create } from "zustand";
import type { User } from "../../types/types";
import { persist } from "zustand/middleware";
import { UserService } from "../../services/userService";
import { authService } from "../../services/authService";

interface UserStore {
   user: User | null;
   isAuth: boolean;
   fetchUser: () => void;
   logout: () => void;
}

const STORE_NAME = "user-storage";

export const useUsersStore = create<UserStore>()(
   persist(
      (set) => ({
         user: null,
         isAuth: false,
         fetchUser: async () => {
            const data = await UserService.fetchUserAPI();
            if (data) set({ user: data, isAuth: true });
         },

         logout: async () => {
            await authService.logout();
            set({ user: null, isAuth: false });
            localStorage.removeItem(STORE_NAME);
         },
      }),
      { name: STORE_NAME }
   )
);
