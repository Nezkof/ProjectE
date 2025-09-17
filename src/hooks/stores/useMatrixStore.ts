import { useState, useEffect } from "react";
import { useAlbumsStore } from "./useAlbumsStore";
import { useExpertsStore } from "./useExpertsStore";

export function useMatrixStore() {
   const { expertsIdxs } = useExpertsStore();
   const { albums } = useAlbumsStore();

   const createComparisonMatrix = (size: number): number[][] => {
      return Array.from({ length: size }, (_, i) =>
         Array.from({ length: size }, (_, j) => {
            if (i === j) return 0;
            return i < j ? 1 : -1;
         })
      );
   };

   const loadMatrices = () => {
      const saved = localStorage.getItem("evaluationMatrices");
      if (saved) return JSON.parse(saved) as number[][][];

      return expertsIdxs.map(() => createComparisonMatrix(albums.length));
   };

   const [evaluationMatrices, setEvaluationMatrices] = useState<number[][][]>(loadMatrices());

   useEffect(() => {
      localStorage.setItem("evaluationMatrices", JSON.stringify(evaluationMatrices));
   }, [evaluationMatrices]);

   const updateMatrix = (matrixIndex: number, newMatrix: number[][]) => {
      const updatedMatrices = evaluationMatrices.map((matrix, idx) =>
         idx === matrixIndex ? newMatrix.map((row) => [...row]) : matrix
      );

      console.log(`Updated matrix for id: ${matrixIndex} expert`);
      console.log(newMatrix);

      setEvaluationMatrices(updatedMatrices);
   };

   return {
      evaluationMatrices,
      updateMatrix,
   };
}
