import { useEffect } from "react";
import "./metricsPage.css";
import { useMetricsStore } from "../../hooks/stores/metricsStore";
import PermutationsTable from "../../components/permutationsTable/PermutationsTable";
import { useAlbumsStore } from "../../hooks/stores/albumStore";
import PermutationsFooter from "../../components/permutationsFooter/PermutationsFooter";

import * as XLSX from "xlsx";

const MetricsPage = () => {
   const cookMetrics = useMetricsStore((state) => state.cookMetrics);
   const albums = useAlbumsStore((state) => state.albums);
   const fetchAlbums = useAlbumsStore((state) => state.fetchAlbums);
   const getCookMetrics = useMetricsStore((state) => state.getCookMetrics);

   useEffect(() => {
      getCookMetrics();
      fetchAlbums();
      console.log(cookMetrics);
   }, []);

   useEffect(() => {
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
   }, [cookMetrics, albums]);

   return (
      <>
         <section className="metrics-page">
            <div className="metrics-page__table-container">
               <PermutationsTable
                  albums={albums}
                  additiveRankingIndex={cookMetrics.additiveRankingIndex}
                  minmaxRankingIndex={cookMetrics.minmaxRankingIndex}
                  permutationsData={cookMetrics.permutationResults}
               />
               <PermutationsFooter />
            </div>
         </section>
      </>
   );
};

export default MetricsPage;
