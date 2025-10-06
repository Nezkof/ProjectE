import { useEffect, useRef, useState } from "react";
import { useMetricsStore } from "./stores/metricsStore";
import { useAlbumsStore } from "./stores/albumStore";

export function useMedianRanking() {
   const fetchAlbums = useAlbumsStore((state) => state.fetchAlbums);
   const getCookMetrics = useMetricsStore((state) => state.getCookMetrics);

   const cookMetrics = useMetricsStore((state) => state.cookMetrics);
   const albums = useAlbumsStore((state) => state.albums);

   const [isLoading, setIsLoading] = useState<boolean>(true);
   const isReady = useRef<boolean>(false);

   useEffect(() => {
      if (isReady) {
         getCookMetrics().then(() => {
            setIsLoading(false);
         });

         fetchAlbums();
      }

      isReady.current = true;
   }, []);

   return {
      isLoading,
      albums,
      cookMetrics,
   };
}
