import { create } from "zustand";
import type { Album } from "../../types/types";
import { persist } from "zustand/middleware";
import * as AlbumsService from "../../services/albumsService";

interface AlbumsState {
   albums: Album[];
   addAlbums: (albums: Album[]) => void;
   fetchAlbums: () => void;
   clearStore: () => void;
}

const STORE_NAME = "albums-storage";

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

         clearStore: () => {
            set({ albums: [] });
            localStorage.removeItem(STORE_NAME);
         },
      }),
      {
         name: STORE_NAME,
      }
   )
);
