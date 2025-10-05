import { useEffect } from "react";
import "./metricsPage.css";
import { useMetricsStore } from "../../hooks/stores/metricsStore";
import PermutationsTable from "../../components/permutationsTable/PermutationsTable";
import { useAlbumsStore } from "../../hooks/stores/albumStore";
import PermutationsFooter from "../../components/permutationsFooter/PermutationsFooter";

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
