import { create } from "zustand";
import { persist } from "zustand/middleware";
import IgnoredAlbumsService from "../../services/ignoredAlbumsService";
import socket from "./../../app/socket";
import type { Album } from "../../types/types";

interface Store {
   myIgnoredAlbums: number[];
   allIgnoredAlbums: Album[];
   fetchMyAlbums: () => void;
   fetchAllAlbums: () => void;
   addIgnoredAlbum: (albumId: number) => void;
   removeIgnoredAlbum: (albumId: number) => void;
   isAlbumIgnored: (albumId: number) => boolean;
   clearStore: () => void;
   initSocketListener: () => void;
}

const STORE_NAME = "ignored-albums-storage";

export const useIgnoredAlbumsStore = create<Store>()(
   persist(
      (set, get) => ({
         myIgnoredAlbums: [],
         allIgnoredAlbums: [],

         fetchMyAlbums: async () => {
            let albums = await IgnoredAlbumsService.getById();
            if (!albums || albums.length === 0) albums = [];

            set({
               myIgnoredAlbums: albums,
            });
         },

         fetchAllAlbums: async () => {
            let albums = await IgnoredAlbumsService.getAll();

            set({
               allIgnoredAlbums: albums,
            });
         },

         addIgnoredAlbum: async (albumId) => {
            await IgnoredAlbumsService.add(albumId);

            set((state) => ({
               myIgnoredAlbums: state.myIgnoredAlbums.includes(albumId)
                  ? state.myIgnoredAlbums
                  : [...state.myIgnoredAlbums, albumId],
            }));
         },

         removeIgnoredAlbum: async (albumId) => {
            await IgnoredAlbumsService.remove(albumId);

            set((state) => ({
               myIgnoredAlbums: state.myIgnoredAlbums.filter((id) => id !== albumId),
            }));
         },

         isAlbumIgnored: (albumId) => get().myIgnoredAlbums.includes(albumId),

         clearStore: () => {
            set({ myIgnoredAlbums: [] });
            localStorage.removeItem(STORE_NAME);
         },

         initSocketListener: () => {
            socket.on("allIgnoredAlbumsUpdated", async () => {
               console.log("test");

               await get().fetchAllAlbums();
            });
         },
      }),
      {
         name: STORE_NAME,
      }
   )
);
