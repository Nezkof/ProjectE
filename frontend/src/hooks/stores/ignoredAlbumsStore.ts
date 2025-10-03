import { create } from "zustand";
import { persist } from "zustand/middleware";
import IgnoredAlbumsService from "../../services/ignoredAlbumsService";

interface Store {
   ignoredAlbums: number[];
   fetchAlbums: () => void;
   addIgnoredAlbum: (albumId: number) => void;
   removeIgnoredAlbum: (albumId: number) => void;
   isAlbumIgnored: (albumId: number) => boolean;
   clearStore: () => void;
}

const STORE_NAME = "ignored-albums-storage";

export const useIgnoredAlbumsStore = create<Store>()(
   persist(
      (set, get) => ({
         ignoredAlbums: [],

         fetchAlbums: async () => {
            let albums = await IgnoredAlbumsService.getById();
            if (!albums || albums.length === 0) albums = [];

            set({
               ignoredAlbums: albums,
            });
         },

         addIgnoredAlbum: async (albumId) => {
            await IgnoredAlbumsService.add(albumId);

            set((state) => ({
               ignoredAlbums: state.ignoredAlbums.includes(albumId)
                  ? state.ignoredAlbums
                  : [...state.ignoredAlbums, albumId],
            }));
         },

         removeIgnoredAlbum: async (albumId) => {
            await IgnoredAlbumsService.remove(albumId);

            set((state) => ({
               ignoredAlbums: state.ignoredAlbums.filter((id) => id !== albumId),
            }));
         },

         isAlbumIgnored: (albumId) => get().ignoredAlbums.includes(albumId),

         clearStore: () => {
            set({ ignoredAlbums: [] });
            localStorage.removeItem(STORE_NAME);
         },
      }),
      {
         name: STORE_NAME,
      }
   )
);
