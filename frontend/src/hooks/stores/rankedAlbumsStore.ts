import { create } from "zustand";
import type { Album } from "../../types/types";
import { persist } from "zustand/middleware";
import { fetchAlbums } from "../../services/albumsService";
import { getRankedAlbums } from "../../services/matricesService";

interface State {
   rankedAlbums: Album[];
   fetchAlbums: () => void;
   updateAlbums: (updateAlbums: Album[]) => void;
}

export const useRankedAlbumsStore = create<State>()(
   persist(
      (set) => ({
         rankedAlbums: [],

         fetchAlbums: async () => {
            let albums = await getRankedAlbums();
            if (!albums || albums.length === 0) albums = await fetchAlbums();
            if (albums) set({ rankedAlbums: albums });
         },

         updateAlbums: (updatedAlbums) => {
            set({ rankedAlbums: updatedAlbums });
         },
      }),
      {
         name: "albums-storage",
      }
   )
);
