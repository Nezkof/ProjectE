import { useState, useEffect } from "react";
import type { Album } from "../../types/types";

export function useAlbumsStore(initialAlbums: Album[] = []) {
   const [albums, setAlbums] = useState<Album[]>(() => {
      const saved = localStorage.getItem("albums");
      return saved ? JSON.parse(saved) : initialAlbums;
   });

   useEffect(() => {
      localStorage.setItem("albums", JSON.stringify(albums));
   }, [albums]);

   const addAlbum = (album: Album) => setAlbums((prev) => [...prev, album]);

   const removeAlbum = (id: number) => setAlbums((prev) => prev.filter((album) => album.id !== id));

   const updateAlbum = (id: number, updated: Partial<Album>) =>
      setAlbums((prev) =>
         prev.map((album) => (album.id === id ? { ...album, ...updated } : album))
      );

   const clearAlbums = () => setAlbums([]);

   return { albums, addAlbum, removeAlbum, updateAlbum, clearAlbums };
}
