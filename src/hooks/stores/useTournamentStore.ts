import { useEffect, useState } from "react";
import type { Album } from "../../types/types";

export function useTournamentStore() {
   const loadAlbums = () => {
      const saved = localStorage.getItem("rankedAlbums");
      return saved ? (JSON.parse(saved) as Album[]) : [];
   };

   const [rankedAlbums, setRankedAlbums] = useState<Album[]>(loadAlbums());

   useEffect(() => {
      localStorage.setItem("rankedAlbums", JSON.stringify(rankedAlbums));
   }, [rankedAlbums]);

   const setAlbums = (ranks: number[], albums: Album[]) => {
      const sortedAlbums = albums
         .map((album, i) => ({ album, rank: ranks[i] }))
         .sort((a, b) => b.rank - a.rank)
         .map(({ album }) => album);

      setRankedAlbums(sortedAlbums);
   };

   return { rankedAlbums, setAlbums };
}
