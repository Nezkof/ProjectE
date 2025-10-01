import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MatrixStore {
   evaluationMatrices: number[][][];
   updateMatrix: (matrixIndex: number, newMatrix: number[][]) => void;
   addMatrix: (newMatrix: number[][]) => void;
   removeRows: (rowsIdx: number[]) => void;
   clearMatrices: () => void;
}

export const useMatrixStore = create<MatrixStore>()(
   persist(
      (set, get) => ({
         evaluationMatrices: [],

         updateMatrix: (matrixIndex, newMatrix) => {
            set((state) => {
               const updatedMatrices = [...state.evaluationMatrices];
               updatedMatrices[matrixIndex] = newMatrix.map((row) => [...row]);

               console.log(`Updated matrix for id: ${matrixIndex} expert`);
               console.log(newMatrix);

               return { evaluationMatrices: updatedMatrices };
            });
         },

         addMatrix: (newMatrix) =>
            set((state) => ({
               evaluationMatrices: [...state.evaluationMatrices, newMatrix.map((row) => [...row])],
            })),

         removeRows: (rowsIdx: number[]) =>
            set((state) => {
               const updatedMatrices = state.evaluationMatrices.map((matrix) => {
                  if (!matrix) return [];
                  const filteredRows = matrix.filter((_, rowIndex) => !rowsIdx.includes(rowIndex));
                  const filteredCols = filteredRows.map((row) =>
                     row.filter((_, colIndex) => !rowsIdx.includes(colIndex))
                  );
                  return filteredCols;
               });
               console.log("Matrices after removing rows/cols:", updatedMatrices);

               return { evaluationMatrices: updatedMatrices };
            }),

         clearMatrices: () =>
            set((state) => ({
               evaluationMatrices: [],
            })),
      }),
      {
         name: "matrices-storage",
      }
   )
);
