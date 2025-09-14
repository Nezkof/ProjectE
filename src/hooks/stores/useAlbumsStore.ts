import { useState, useEffect } from "react";
import type { Album } from "../../types/types";

export function useAlbumsStore(initialAlbums: Album[] = []) {
   const loadAlbums = () => {
      const saved = localStorage.getItem("albums");
      return saved ? JSON.parse(saved) : initialAlbums;
   };

   const createMatrix = () =>
      Array.from({ length: albums.length }, () => Array(albums.length).fill(0));

   const loadMatrix = () => {
      const saved = localStorage.getItem("evaluationMatrix");
      if (saved) return JSON.parse(saved);

      return albums.length > 0 ? createMatrix() : [];
   };

   const [albums, setAlbums] = useState<Album[]>(loadAlbums());
   const [rankedAlbums, setRankedAlbums] = useState<Album[]>(loadAlbums());
   const [evaluationMatrix, setEvaluationMatrix] = useState<number[][]>(loadMatrix());

   useEffect(() => {
      localStorage.setItem("albums", JSON.stringify(albums));
   }, [albums]);

   useEffect(() => {
      localStorage.setItem("evaluationMatrix", JSON.stringify(evaluationMatrix));
      getRankedAlbums();
   }, [evaluationMatrix]);

   const updateMatrix = (i: number, j: number, pointsAmount: number = albums.length) => {
      const newMatrix = evaluationMatrix.map((row) => [...row]);
      newMatrix[i][j] += pointsAmount;
      newMatrix[j][i] += 1 / pointsAmount;
      setEvaluationMatrix(newMatrix);
   };

   const calculateRanks = () => {
      let ranks: number[] = [];

      for (let row = 0; row < evaluationMatrix.length; ++row) {
         let value = 1;
         for (let col = 0; col < evaluationMatrix.length; ++col) {
            if (row === col) continue;
            value *= evaluationMatrix[row][col];
         }
         value = Math.pow(value, 1 / evaluationMatrix.length);
         ranks.push(value);
      }

      const sum = ranks.reduce((acc, val) => acc + val, 0);
      ranks = ranks.map((val) => val / sum);

      return ranks;
   };

   const getRankedAlbums = () => {
      const ranks = calculateRanks();

      const rankedAlbums = albums
         .map((album, i) => ({ album, rank: ranks[i] }))
         .sort((a, b) => b.rank - a.rank)
         .map(({ album }) => album);

      setRankedAlbums(rankedAlbums);
   };

   const addAlbum = (album: Album) => setAlbums((prev) => [...prev, album]);

   const clearAlbums = () => setAlbums([]);

   const getEvaluationMatrix = () => {
      return evaluationMatrix;
   };

   const addMatrixPoints = (matrix2: number[][]) => {
      console.log(evaluationMatrix);

      const newMatrix = evaluationMatrix.map((row) => [...row]);

      for (let i = 0; i < evaluationMatrix.length; ++i) {
         for (let j = 0; j < evaluationMatrix.length; ++j) {
            newMatrix[i][j] += matrix2[i][j];
         }
      }

      setEvaluationMatrix(newMatrix);
   };

   return {
      albums,
      updateMatrix,
      getRankedAlbums,
      rankedAlbums,
      addAlbum,
      clearAlbums,
      setEvaluationMatrix,
      getEvaluationMatrix,
      addMatrixPoints,
   };
}
