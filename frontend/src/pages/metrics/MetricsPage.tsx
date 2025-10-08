import { useEffect } from "react";
import "./metricsPage.css";
import PermutationsTable from "../../components/permutationsTable/PermutationsTable";

import { MetricNames, useMedianRanking } from "../../hooks/useMedianRanking";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";

const MetricsPage = () => {
   const { isLoading, albums, activeMetric, metrics, setCurrMetricKey } = useMedianRanking();

   useEffect(() => {
      metrics;
   }, [isLoading, metrics]);

   return (
      <>
         {isLoading ? (
            <LoadingScreen />
         ) : (
            <section className="metrics-page">
               <div className="metrics-page__tabs">
                  {Object.entries(MetricNames).map(([key, displayName], index) => (
                     <button
                        key={key}
                        className={`metrics-page__tab ${
                           activeMetric === index ? "metrics-page__tab--active" : ""
                        }`}
                        onClick={() => setCurrMetricKey(index)}
                     >
                        {displayName}
                     </button>
                  ))}
               </div>

               <div className="metrics-page__content">
                  {metrics[activeMetric].length > 0 ? (
                     <div className="metrics-page__table-container">
                        <PermutationsTable albums={albums} metric={metrics[activeMetric]} />
                     </div>
                  ) : (
                     <p>Немає даних для цієї метрики.</p>
                  )}
               </div>
            </section>
         )}
      </>
   );
};

export default MetricsPage;
