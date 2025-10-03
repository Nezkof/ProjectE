import { create } from "zustand";
import type { Album } from "../../types/types";
import { persist } from "zustand/middleware";
import { fetchAlbums } from "../../services/albumsService";
import { getRankedAlbums } from "../../services/matricesService";
import socket from "../../app/socket";

interface State {
   rankedAlbums: Album[];
   fetchAlbums: () => void;
   updateAlbums: (updateAlbums: Album[]) => void;
   initSocketListener: () => void;
   clearStore: () => void;
}

const STORE_NAME = "albums-storage";

export const useRankedAlbumsStore = create<State>()(
   persist(
      (set, get) => ({
         rankedAlbums: [],

         fetchAlbums: async () => {
            let albums = await getRankedAlbums();
            if (!albums || albums.length === 0) albums = await fetchAlbums();
            if (albums) set({ rankedAlbums: albums });
         },

         updateAlbums: (updatedAlbums) => {
            set({ rankedAlbums: updatedAlbums });
         },

         initSocketListener: () => {
            socket.on("albumsUpdated", async ({ action }) => {
               switch (action) {
                  case "add":
                  case "removeMany":
                     get().fetchAlbums();
                     break;
               }
            });
         },

         clearStore: () => {
            set({ rankedAlbums: [] });
            localStorage.removeItem(STORE_NAME);
         },
      }),
      {
         name: STORE_NAME,
      }
   )
);
