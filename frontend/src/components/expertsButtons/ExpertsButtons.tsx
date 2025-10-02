import { useExpertsStore } from "../../hooks/stores/expertsStore";
import { useMatrixStore } from "../../hooks/stores/matrixStore";
import Button from "../button/Button";
import "./expertsButtons.css";

import ExportIcon from "/icons/export.svg";

import * as XLSX from "xlsx";

interface Result {
   ranks: number[];
}

const ExpertsButtons = () => {
   const currentExpertId = useExpertsStore((state) => state.currentExpertId);
   const experts = useExpertsStore((state) => state.experts);
   const setCurrentExpertId = useExpertsStore((state) => state.setCurrentExpertId);
   const evaluationMatrices = useMatrixStore((state) => state.evaluationMatrices);

   function exportToExcel(results: Result[], fileName: string = "results.xlsx") {
      const rows = results.map((result, i) => {
         const row: Record<string, number> = {};
         result.ranks.forEach((rank, idx) => {
            row[`Album ${idx + 1}`] = rank;
         });
         return { Matrix: i + 1, ...row };
      });
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Ranks");
      XLSX.writeFile(workbook, fileName);
   }

   function getRanks(scores: number[]): number[] {
      const indexed = scores.map((score, index) => ({ index, score }));
      indexed.sort((a, b) => b.score - a.score);
      const ranks = new Array(scores.length);

      let currentRank = 1;
      for (let i = 0; i < indexed.length; i++) {
         if (i > 0 && indexed[i].score < indexed[i - 1].score) {
            currentRank = i + 1;
         }
         ranks[indexed[i].index] = currentRank;
      }

      return ranks;
   }

   function computeRanking(matrix: number[][]): number[] {
      const n = matrix.length;
      const scores = new Array(n).fill(0);

      for (let i = 0; i < n; i++) {
         let score = 0;
         for (let j = 0; j < n; j++) {
            score += matrix[i][j];
         }
         scores[i] = score;
      }

      return scores;
   }

   function evaluateMatrices(evaluationMatrices: number[][][]): {
      ranks: number[];
   }[] {
      return evaluationMatrices.map((matrix) => {
         const scores = computeRanking(matrix);
         const ranks = getRanks(scores);
         return { ranks };
      });
   }

   const handleExportBtn = () => {
      console.log(evaluationMatrices);

      let results = evaluateMatrices(evaluationMatrices);

      exportToExcel(results, "album_ranks.xlsx");

      // const json = JSON.stringify(evaluationMatrices, null, 2);
      // const blob = new Blob([json], { type: "application/json" });
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = "evaluationMatrices.json";
      // a.click();

      // URL.revokeObjectURL(url);
   };

   return (
      <>
         <aside className="experts-buttons">
            {experts.map((expert) => (
               <Button
                  key={expert.id}
                  text={expert.name}
                  onClick={() => setCurrentExpertId(expert.id)}
                  className={currentExpertId === expert.id ? ["active", "wide"] : ["wide"]}
               />
            ))}
            <Button iconPath={ExportIcon} alt={ExportIcon} onClick={() => handleExportBtn()} />
         </aside>
      </>
   );
};

export default ExpertsButtons;
