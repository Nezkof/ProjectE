import { create } from "zustand";
import type { Album } from "../../types/types";
import { persist } from "zustand/middleware";
import AlbumsService from "../../services/albumsService";

interface AlbumsState {
   albums: Album[];
   setAlbums: (albums: Album[]) => void;
   fetchAlbums: () => void;
   clearStore: () => void;
}

const STORE_NAME = "albums-storage";

export const useAlbumsStore = create<AlbumsState>()(
   persist(
      (set, get) => ({
         albums: [],
         rankedAlbums: [],

         setAlbums: async (albums) => {
            await AlbumsService.setAlbums(albums);
            set({ albums: albums });
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
