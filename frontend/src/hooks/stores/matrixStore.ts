import { create } from "zustand";
import { persist } from "zustand/middleware";

import MatricesService from "./../../services/matricesService";

interface MatrixStore {
   updateMatrix: (newMatrix: number[][]) => void;
}

const STORE_NAME = "matrices-storage";

export const useMatrixStore = create<MatrixStore>()(
   persist(
      (set) => ({
         evaluationMatrices: [],

         updateMatrix: async (newMatrix) => {
            await MatricesService.addMatrix(newMatrix);
         },
      }),
      {
         name: STORE_NAME,
      }
   )
);
