import { create } from "zustand";
import * as ignoredAlbumsService from "./../../services/ignoredAlbumsService";
import type { Album } from "../../types/types";

interface Store {
   ignoredAlbums: number[];
   fetchAlbums: () => Promise<Album[]>;
   addIgnoredAlbum: (albumId: number) => void;
   removeIgnoredAlbum: (albumId: number) => void;
   isAlbumIgnored: (albumId: number) => boolean;
   clearignoredAlbums: () => void;
}

export const useIgnoredAlbumsStore = create<Store>()((set, get) => ({
   ignoredAlbums: [],

   fetchAlbums: async () => {
      const albums = await ignoredAlbumsService.getAll();
      return albums && albums.length !== 0 ? albums : [];
   },

   addIgnoredAlbum: async (albumId) => {
      await ignoredAlbumsService.add(albumId);

      set((state) => ({
         ignoredAlbums: state.ignoredAlbums.includes(albumId)
            ? state.ignoredAlbums
            : [...state.ignoredAlbums, albumId],
      }));
   },

   removeIgnoredAlbum: async (albumId) => {
      await ignoredAlbumsService.remove(albumId);

      set((state) => ({
         ignoredAlbums: state.ignoredAlbums.filter((id) => id !== albumId),
      }));
   },

   isAlbumIgnored: (albumId) => get().ignoredAlbums.includes(albumId),

   clearignoredAlbums: () => set({ ignoredAlbums: [] }),
}));
