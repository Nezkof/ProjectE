import { useEffect, useState } from "react";

export function useExpertsStore() {
   const loadExpertsIdxs = () => {
      const saved = localStorage.getItem("expertsIdxs");
      return saved ? JSON.parse(saved) : [];
   };

   const loadCurrentExpert = (experts: number[]) => {
      const saved = localStorage.getItem("currentExpertId");
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed !== null && experts.includes(parsed) ? parsed : experts[0] ?? 0;
   };

   const [expertsIdxs, setExpertsIdxs] = useState<number[]>(loadExpertsIdxs());
   const [currentExpertId, setCurrentExpertId] = useState<number>(() =>
      loadCurrentExpert(expertsIdxs)
   );

   useEffect(() => {
      localStorage.setItem("expertsIdxs", JSON.stringify(expertsIdxs));
   }, [expertsIdxs]);

   useEffect(() => {
      localStorage.setItem("currentExpertId", JSON.stringify(currentExpertId));
      console.log(`Changed expert, new id: ${currentExpertId}`);
   }, [currentExpertId]);

   const addExperts = (amount: number) => {
      const experts = Array.from({ length: amount }, (_, i) => i);
      console.log(experts);

      setExpertsIdxs(experts);
      setCurrentExpertId(experts[0] ?? 0);
   };

   const getCurrentExpertId = () => {
      const saved = localStorage.getItem("currentExpertId");
      return saved ? Number(saved) : currentExpertId;
   };

   return { expertsIdxs, currentExpertId, getCurrentExpertId, addExperts, setCurrentExpertId };
}
