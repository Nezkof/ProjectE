import { useEffect, useState } from "react";
import type { Album } from "../types/types";
import { useAlbumsStore } from "./stores/useAlbumsStore";
import { useTournamentStore } from "./stores/useTournamentStore";

export function useTournament() {
   const createMatrix = () =>
      Array.from({ length: albums.length }, () => Array(albums.length).fill(0));

   const { albums } = useAlbumsStore();
   const { setAlbums } = useTournamentStore();

   const [albumsPairs, setAlbumsPairs] = useState<number[][]>([]);
   const [currPairIdx, setCurrPairIdx] = useState<number>(0);
   const [matrix, setMatrix] = useState<number[][]>(createMatrix);

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

   const rankAlbums = (mat: number[][]) => {
      let ranks: number[] = [];

      for (let i = 0; i < mat.length; ++i) {
         let wins = 0;
         let loses = 0;

         for (let j = 0; j < mat.length; ++j) {
            if (i === j) continue;
            if (mat[i][j] === 1) ++wins;
            if (mat[i][j] === 0) ++loses;
         }

         ranks.push(wins - loses);
      }

      return ranks;
   };

   const compareAlbums = (i: number, j: number) => {
      i -= 1;
      j -= 1;

      const newMatrix = matrix.map((row) => [...row]);
      newMatrix[i][j] = 1;
      setMatrix(newMatrix);

      if (currPairIdx === albumsPairs.length - 1) {
         setAlbums(rankAlbums(newMatrix), albums);
         window.location.href = "/";
      } else {
         setCurrPairIdx(currPairIdx + 1);
      }
   };

   const getLeftAlbum = () => {
      if (albumsPairs.length === 0) return albums[0];

      return albums[albumsPairs[currPairIdx][0]];
   };

   const getRightAlbum = () => {
      if (albumsPairs.length === 0) return albums[1];

      return albums[albumsPairs[currPairIdx][1]];
   };

   const getCurrPairIdx = () => {
      return currPairIdx + 1;
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
