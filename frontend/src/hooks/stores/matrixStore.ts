import { create } from "zustand";
import { persist } from "zustand/middleware";

import * as matricesService from "./../../services/matricesService";

interface MatrixStore {
   updateMatrix: (newMatrix: number[][]) => void;
}

export const useMatrixStore = create<MatrixStore>()(
   persist(
      (set) => ({
         evaluationMatrices: [],

         updateMatrix: async (newMatrix) => {
            await matricesService.addMatrix(newMatrix);
         },
      }),
      {
         name: "matrices-storage",
      }
   )
);
