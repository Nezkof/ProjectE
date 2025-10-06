import { useEffect } from "react";
import "./metricsPage.css";
import PermutationsTable from "../../components/permutationsTable/PermutationsTable";

import * as XLSX from "xlsx";
import { useMedianRanking } from "../../hooks/useMedianRanking";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";

const MetricsPage = () => {
   const { isLoading, albums, cookMetrics } = useMedianRanking();

   const downloadFile = () => {
      if (!cookMetrics || !albums.length) return;

      const headers = [
         ...albums.map((album) => album.title),
         ...cookMetrics.permutationResults[0].distances.map((d) => d.user),
         "Sum",
         "Max",
      ];

      const data: (string | number)[][] = cookMetrics.permutationResults.map((p) => [
         ...p.permutation,
         ...p.distances.map((d) => d.distance),
         p.sum,
         p.maxl,
      ]);

      data.unshift(headers);

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "CookMetrics");

      XLSX.writeFile(wb, "cook_metrics.xlsx");
   };

   useEffect(() => {
      // downloadFile()
   }, [cookMetrics, albums]);

   useEffect(() => {
      console.log(isLoading);
   }, [isLoading]);

   return (
      <>
         {isLoading ? (
            <LoadingScreen />
         ) : (
            <section className="metrics-page">
               <div className="metrics-page__table-container">
                  <PermutationsTable
                     albums={albums}
                     additiveRankingIndex={cookMetrics.additiveRankingIndex}
                     minmaxRankingIndex={cookMetrics.minmaxRankingIndex}
                     permutationsData={cookMetrics.permutationResults}
                  />
               </div>
            </section>
         )}
      </>
   );
};

export default MetricsPage;
