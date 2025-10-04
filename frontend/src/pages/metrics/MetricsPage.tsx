import { useEffect } from "react";
import "./metricsPage.css";
import { useMetricsStore } from "../../hooks/stores/metricsStore";

const MetricsPage = () => {
   const cookMetrics = useMetricsStore((state) => state.cookMetrics);
   const getCookMetrics = useMetricsStore((state) => state.getCookMetrics);

   useEffect(() => {
      getCookMetrics();
      console.log(cookMetrics);
   }, []);
   return (
      <>
         <section className="metrics-page"></section>
      </>
   );
};

export default MetricsPage;
