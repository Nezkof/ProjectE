import { useState } from "react";

export interface TournamentAlbum {
   id: number;
   rank: number;
}

export function useTournamentStore(initialList: TournamentAlbum[] = []) {
   const [tournamentList, setTournamentList] = useState<TournamentAlbum[]>(initialList);

   const addAlbum = (id: number) => {
      setTournamentList((prev) => [...prev, { id, rank: prev.length + 1 }]);
   };

   const removeAlbum = (id: number) => {
      setTournamentList((prev) => {
         const filtered = prev.filter((album) => album.id !== id);
         return filtered.map((album, index) => ({ ...album, rank: index + 1 }));
      });
   };

   const updateRank = (id: number, newRank: number) => {
      setTournamentList((prev) => {
         const list = [...prev];
         const index = list.findIndex((album) => album.id === id);
         if (index === -1) return list;

         const [movedAlbum] = list.splice(index, 1);
         list.splice(newRank - 1, 0, movedAlbum);

         return list.map((album, i) => ({ ...album, rank: i + 1 }));
      });
   };

   const clearTournament = () => setTournamentList([]);

   return {
      tournamentList,
      addAlbum,
      removeAlbum,
      updateRank,
      clearTournament,
   };
}
