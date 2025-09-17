import { create } from "zustand";
import type { Album } from "../../types/types";
import { persist } from "zustand/middleware";

interface AlbumsState {
   albums: Album[];
   rankedAlbums: Album[];
   addAlbum: (album: Album) => void;
   clearAlbums: () => void;
   removeAlbum: (id: number) => void;
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

         removeAlbum: (id: number) =>
            set((state) => ({
               albums: state.albums.filter((album) => album.id !== id),
               rankedAlbums: state.rankedAlbums.filter((album) => album.id !== id),
            })),
      }),
      {
         name: "albums-storage",
      }
   )
);
