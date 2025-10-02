import { useEffect, useRef } from "react";
import type { Album } from "../types/types";
import { useMatrixStore } from "./stores/matrixStore";
import { useRankedAlbumsStore } from "./stores/rankedAlbumsStore";

export function useRanking() {
   const updateMatrix = useMatrixStore((state) => state.updateMatrix);
   const rankedAlbums = useRankedAlbumsStore((state) => state.rankedAlbums);
   const fetchAlbums = useRankedAlbumsStore((state) => state.fetchAlbums);
   const updateAlbums = useRankedAlbumsStore((state) => state.updateAlbums);

   const tempMatrixRef = useRef<number[][] | null>(null);

   useEffect(() => {
      if (!rankedAlbums || rankedAlbums.length === 0) fetchAlbums();
   }, []);

   const updateAlbumPosition = (sourceIdx: number, destinationIdx: number) => {
      const updatedAlbums = Array.from(rankedAlbums);
      const [movedAlbum] = updatedAlbums.splice(sourceIdx, 1);
      updatedAlbums.splice(destinationIdx, 0, movedAlbum);

      console.log(`Альбом переміщено з ${sourceIdx} місця на ${destinationIdx}`);

      updateAlbums(updatedAlbums);
      tempMatrixRef.current = calculatePoints(updatedAlbums);
      confirmRating();
   };

   const calculatePoints = (albumsOrder: Album[]) => {
      const matrix = Array.from({ length: albumsOrder.length }, () =>
         Array(albumsOrder.length).fill(0)
      );

      for (let first = 0; first < albumsOrder.length; ++first) {
         for (let second = first + 1; second < albumsOrder.length; ++second) {
            const firstAlbum = albumsOrder[first];
            const secondAlbum = albumsOrder[second];

            matrix[firstAlbum.id - 1][secondAlbum.id - 1] = 1;
            matrix[secondAlbum.id - 1][firstAlbum.id - 1] = -1;
         }
      }

      return matrix;
   };

   const confirmRating = () => {
      if (!tempMatrixRef.current) tempMatrixRef.current = calculatePoints(rankedAlbums);
      updateMatrix(tempMatrixRef.current);
   };

   return { rankedAlbums, updateAlbumPosition };
}
