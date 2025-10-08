import "./metricsPage.css";
import PermutationsTable from "../../components/permutationsTable/PermutationsTable";

import { MetricNames } from "../../hooks/useMedianRanking";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import ExpertsStatistics from "../../components/expertsStatistics/ExpertsStatistics";
import { useMetrics } from "../../hooks/useMetrics";

const MetricsPage = () => {
   const { isLoading, albums, activeMetric, metrics, expertsStatistics, setCurrMetricKey } =
      useMetrics();

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
                  <div className="metrics-page__table-container">
                     <PermutationsTable albums={albums} metric={metrics[activeMetric]} />
                  </div>
               </div>

               <ExpertsStatistics expertsStats={expertsStatistics}></ExpertsStatistics>
            </section>
         )}
      </>
   );
};

export default MetricsPage;
