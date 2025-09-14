import { useEffect, useState } from "react";
import type { Album } from "../types/types";
import { useAlbumsStore } from "./stores/useAlbumsStore";

export function useRanking() {
   const { albums } = useAlbumsStore();

   const [rankedAlbums, setRankedAlbums] = useState<Album[]>([]);

   useEffect(() => {
      setRankedAlbums(albums);
   }, []);

   const updateAlbumPosition = (sourceIdx: number, destinationIdx: number) => {
      const updatedAlbums = Array.from(rankedAlbums);
      const [movedAlbum] = updatedAlbums.splice(sourceIdx, 1);
      updatedAlbums.splice(destinationIdx, 0, movedAlbum);

      setRankedAlbums(updatedAlbums);
      // setAlbums(updatedAlbums);
   };

   const ratingConfirm = () => {
      window.location.href = "/";
   };

   return { rankedAlbums, ratingConfirm, updateAlbumPosition };
}
