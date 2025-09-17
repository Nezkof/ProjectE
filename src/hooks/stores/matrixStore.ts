import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MatrixStore {
   evaluationMatrices: number[][][];
   updateMatrix: (matrixIndex: number, newMatrix: number[][]) => void;
   addMatrix: (newMatrix: number[][]) => void;
}

export const useMatrixStore = create<MatrixStore>()(
   persist(
      (set, get) => ({
         evaluationMatrices: [],

         updateMatrix: (matrixIndex, newMatrix) => {
            set((state) => {
               const updatedMatrices = [...state.evaluationMatrices];

               if (!updatedMatrices[matrixIndex]) {
                  updatedMatrices[matrixIndex] = newMatrix.map((row) => [...row]);
               } else {
                  updatedMatrices[matrixIndex] = newMatrix.map((row) => [...row]);
               }

               console.log(`Updated matrix for id: ${matrixIndex} expert`);
               console.log(newMatrix);

               return { evaluationMatrices: updatedMatrices };
            });
         },

         addMatrix: (newMatrix) =>
            set((state) => ({
               evaluationMatrices: [...state.evaluationMatrices, newMatrix.map((row) => [...row])],
            })),
      }),
      {
         name: "matrices-storage",
      }
   )
);
