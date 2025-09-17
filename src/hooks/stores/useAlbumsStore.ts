import { useState, useEffect } from "react";
import type { Album } from "../../types/types";

export function useAlbumsStore(initialAlbums: Album[] = []) {
   const loadAlbums = () => {
      const saved = localStorage.getItem("albums");
      return saved ? JSON.parse(saved) : initialAlbums;
   };

   const [albums, setAlbums] = useState<Album[]>(loadAlbums());
   const [rankedAlbums, setRankedAlbums] = useState<Album[]>(loadAlbums());

   useEffect(() => {
      localStorage.setItem("albums", JSON.stringify(albums));
   }, [albums]);

   const addAlbum = (album: Album) => setAlbums((prev) => [...prev, album]);

   const clearAlbums = () => setAlbums([]);

   return {
      albums,
      rankedAlbums,
      addAlbum,
      clearAlbums,
   };
}
