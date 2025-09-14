import { useEffect, useRef, useState } from "react";
import type { Album } from "../types/types";
import { useAlbumsStore } from "./stores/useAlbumsStore";

export function useRanking() {
   const { albums, addMatrixPoints } = useAlbumsStore();

   const [rankedAlbums, setRankedAlbums] = useState<Album[]>([]);
   const tempMatrixRef = useRef<number[][] | null>(null);

   useEffect(() => {
      setRankedAlbums(albums);
   }, [albums]);

   const updateAlbumPosition = (sourceIdx: number, destinationIdx: number) => {
      const updatedAlbums = Array.from(rankedAlbums);
      const [movedAlbum] = updatedAlbums.splice(sourceIdx, 1);
      updatedAlbums.splice(destinationIdx, 0, movedAlbum);

      setRankedAlbums(updatedAlbums);

      tempMatrixRef.current = calculatePoints(updatedAlbums);
      console.log(tempMatrixRef.current);
   };

   const calculatePoints = (albumsOrder: Album[]) => {
      const matrix = Array.from({ length: albumsOrder.length }, () =>
         Array(albumsOrder.length).fill(0)
      );

      for (let first = 0; first < albumsOrder.length; ++first) {
         for (let second = first + 1; second < albumsOrder.length; ++second) {
            const firstAlbum = albumsOrder[first];
            const secondAlbum = albumsOrder[second];

            const pointsAmount = Math.abs(first - second);

            matrix[firstAlbum.id - 1][secondAlbum.id - 1] = pointsAmount;
            matrix[secondAlbum.id - 1][firstAlbum.id - 1] = 1 / pointsAmount;
         }
      }

      return matrix;
   };

   const confirmRating = () => {
      console.log(tempMatrixRef.current);
      if (!tempMatrixRef.current) return;

      addMatrixPoints(tempMatrixRef.current);
   };

   return { rankedAlbums, confirmRating, updateAlbumPosition };
}
