import { create } from "zustand";
import type { Album } from "../../types/types";
import { persist } from "zustand/middleware";
import * as AlbumsService from "../../services/albumsService";

interface AlbumsState {
   albums: Album[];
   rankedAlbums: Album[];
   addAlbums: (albums: Album[]) => void;
   fetchAlbums: () => void;
   clearAlbums: () => void;
   removeAlbum: (id: number) => void;
   reduceIds: () => void;
}

export const useAlbumsStore = create<AlbumsState>()(
   persist(
      (set) => ({
         albums: [],
         rankedAlbums: [],

         addAlbums: async (albums) => {
            await AlbumsService.addAlbums(albums);
         },

         fetchAlbums: async () => {
            const albums = await AlbumsService.fetchAlbums();
            if (albums) set({ albums: albums });
         },

         clearAlbums: () => set({ albums: [] }),

         removeAlbum: (id) =>
            set((state) => ({
               albums: state.albums.filter((album) => album.id !== id),
               rankedAlbums: state.rankedAlbums.filter((album) => album.id !== id),
            })),

         reduceIds: () =>
            set((state) => ({
               albums: state.albums.map((alb, idx) => ({
                  ...alb,
                  id: idx + 1,
               })),
            })),
      }),
      {
         name: "albums-storage",
      }
   )
);
