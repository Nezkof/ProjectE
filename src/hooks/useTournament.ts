import { useEffect, useState } from "react";
import { useAlbumsStore } from "./stores/useAlbumsStore";

export function useTournament() {
   const { albums, updateMatrix } = useAlbumsStore();

   const [albumsPairs, setAlbumsPairs] = useState<number[][]>([]);
   const [currPairIdx, setCurrPairIdx] = useState<number>(0);

   useEffect(() => {
      if (albums.length > 1) {
         formAllPairs();
      }
   }, [albums]);

   function shuffle(array: number[][]) {
      const result = [...array];
      for (let i = result.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
   }

   const formAllPairs = () => {
      const pairs: number[][] = [];
      for (let i = 0; i < albums.length; i++) {
         for (let j = i + 1; j < albums.length; j++) {
            pairs.push([i, j]);
         }
      }

      setAlbumsPairs(shuffle(pairs));
      setCurrPairIdx(0);
   };

   const compareAlbums = (i: number, j: number) => {
      i -= 1;
      j -= 1;

      updateMatrix(i, j);
      setCurrPairIdx((prev) => prev + 1);
   };

   const getLeftAlbum = () => {
      if (albumsPairs.length === 0 || currPairIdx >= albumsPairs.length) return albums[0];

      return albums[albumsPairs[currPairIdx][0]];
   };

   const getRightAlbum = () => {
      if (albumsPairs.length === 0 || currPairIdx >= albumsPairs.length) return albums[1];

      return albums[albumsPairs[currPairIdx][1]];
   };

   const getCurrPairIdx = () => {
      return currPairIdx;
   };

   const getPairsAmount = () => {
      return albumsPairs.length;
   };

   return {
      compareAlbums,
      getLeftAlbum,
      getRightAlbum,
      getCurrPairIdx,
      getPairsAmount,
   };
}
