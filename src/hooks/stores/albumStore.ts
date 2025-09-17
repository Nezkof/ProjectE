import { create } from "zustand";
import type { Album } from "../../types/types";
import { persist } from "zustand/middleware";

interface AlbumsState {
   albums: Album[];
   rankedAlbums: Album[];
   addAlbum: (album: Album) => void;
   clearAlbums: () => void;
}

export const useAlbumsStore = create<AlbumsState>()(
   persist(
      (set) => ({
         albums: [],
         rankedAlbums: [],
         addAlbum: (album) =>
            set((state) => ({
               albums: [...state.albums, album],
            })),
         clearAlbums: () => set({ albums: [] }),
      }),
      {
         name: "albums-storage",
      }
   )
);
