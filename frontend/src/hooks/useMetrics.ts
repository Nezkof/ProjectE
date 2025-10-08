import { useEffect, useState } from "react";
import MetricsService from "../services/metricsService";
import { useMedianRanking } from "./useMedianRanking";
import type { ExpertStatistics } from "../types/types";

export function useMetrics() {
   const { isMetricsLoading, albums, activeMetric, metrics, setCurrMetricKey } = useMedianRanking();

   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [expertsStatistics, setExpertsStatistics] = useState<ExpertStatistics[]>([]);

   useEffect(() => {
      const calculateStats = async () => {
         const result = await MetricsService.getExpertsStatistics(metrics[activeMetric]);
         console.log(result);

         setExpertsStatistics(result);
         setIsLoading(false);
      };

      if (isMetricsLoading === false) calculateStats();
   }, [isMetricsLoading, activeMetric]);

   return { isLoading, albums, activeMetric, metrics, expertsStatistics, setCurrMetricKey };
}
