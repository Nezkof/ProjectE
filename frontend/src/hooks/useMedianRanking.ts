import { useEffect, useRef, useState } from "react";
import { useMetricsStore } from "./stores/metricsStore";
import { useAlbumsStore } from "./stores/albumStore";

export const MetricNames = {
   additiveCook: "AdditiveCook",
   minmaxCook: "MinMaxCook",
   additiveHamming: "AdditiveHamming",
   minmaxHamming: "MinmaxHamming",
} as const;

export type MetricKey = (typeof MetricNames)[keyof typeof MetricNames];

export function useMedianRanking() {
   const fetchAlbums = useAlbumsStore((state) => state.fetchAlbums);
   const getCookMetrics = useMetricsStore((state) => state.getCookMetrics);

   const metrics = useMetricsStore((state) => state.metrics);
   const albums = useAlbumsStore((state) => state.albums);

   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [currMetricKey, setCurrMetricKey] = useState<number>(0);
   const isReady = useRef<boolean>(false);

   useEffect(() => {
      if (!isReady.current) {
         isReady.current = true;
         Promise.all([getCookMetrics(), fetchAlbums()]).then(() => {
            setIsLoading(false);
         });
      }
   }, []);

   useEffect(() => {
      if (!isLoading) {
         console.log("Metrics:", metrics);
      }
   }, [metrics, isLoading]);

   return {
      isMetricsLoading: isLoading,
      albums,
      activeMetric: currMetricKey,
      metrics,
      setCurrMetricKey,
   };
}
