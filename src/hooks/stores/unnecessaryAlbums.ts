import { create } from "zustand";

interface UnnecessaryAlbumsState {
   unnecessaryAlbums: Map<number, number[]>;
   addUnnecessaryAlbum: (expertId: number, albumId: number) => void;
   removeUnnecessaryAlbum: (expertId: number, albumId: number) => void;
   isAlbumUnnecessary: (expertId: number, albumId: number) => boolean;
}

export const useUnnecessaryAlbumsStore = create<UnnecessaryAlbumsState>()((set, get) => ({
   unnecessaryAlbums: new Map(),

   addUnnecessaryAlbum: (expertId, albumId) =>
      set((state) => {
         const newMap = new Map(state.unnecessaryAlbums);
         const current = newMap.get(albumId) ?? [];
         if (!current.includes(expertId)) {
            newMap.set(albumId, [...current, expertId]);
         }
         return { unnecessaryAlbums: newMap };
      }),

   removeUnnecessaryAlbum: (expertId, albumId) =>
      set((state) => {
         const newMap = new Map(state.unnecessaryAlbums);
         const current = newMap.get(albumId) ?? [];
         const updated = current.filter((id) => id !== expertId);

         if (updated.length > 0) {
            newMap.set(albumId, updated);
         } else {
            newMap.delete(albumId);
         }

         return { unnecessaryAlbums: newMap };
      }),

   isAlbumUnnecessary: (expertId, albumId) => {
      const map = get().unnecessaryAlbums;
      if (!map.has(albumId)) return false;
      return (map.get(albumId) ?? []).includes(expertId);
   },
}));
