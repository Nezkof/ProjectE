import { useEffect, useRef, useState } from "react";
import type { Album } from "../types/types";
import { useAlbumsStore } from "./stores/albumStore";
import { useExpertsStore } from "./stores/expertsStore";
import { useMatrixStore } from "./stores/matrixStore";

export function useRanking() {
   const albums = useAlbumsStore((state) => state.albums);
   const fetchAlbums = useAlbumsStore((state) => state.fetchAlbums);
   const currentExpertId = useExpertsStore((state) => state.currentExpertId);
   const updateMatrix = useMatrixStore((state) => state.updateMatrix);

   const [rankedAlbums, setRankedAlbums] = useState<Album[]>([]);
   const tempMatrixRef = useRef<number[][] | null>(null);

   useEffect(() => {
      fetchAlbums();
      setRankedAlbums(albums);
   }, [albums]);

   const updateAlbumPosition = (sourceIdx: number, destinationIdx: number) => {
      const updatedAlbums = Array.from(rankedAlbums);
      const [movedAlbum] = updatedAlbums.splice(sourceIdx, 1);
      updatedAlbums.splice(destinationIdx, 0, movedAlbum);

      console.log(`Альбом переміщено з ${sourceIdx} місця на ${destinationIdx}`);

      setRankedAlbums(updatedAlbums);
      tempMatrixRef.current = calculatePoints(updatedAlbums);
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

      updateMatrix(currentExpertId, tempMatrixRef.current);
   };

   return { rankedAlbums, confirmRating, updateAlbumPosition };
}
