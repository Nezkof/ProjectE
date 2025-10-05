import { useEffect, useState } from "react";
import { useUsersStore } from "../../hooks/stores/userStore";
import "./hammingPage.css";
import type { User } from "../../types/types";
import { useMetricsStore } from "../../hooks/stores/metricsStore";

const HammingPage = () => {
   const fetchUsers = useUsersStore((state) => state.fetchUsers);
   const getHammingMetrics = useMetricsStore((state) => state.getHammingMetrics);
   const hammingMetric = useMetricsStore((state) => state.hammingMetric);

   const [users, setUsers] = useState<User[]>([]);
   const [firstUserId, setFirstUserId] = useState<string>("");
   const [secondUserId, setSecondUserId] = useState<string>("");

   useEffect(() => {
      const fetchData = async () => {
         const users = await fetchUsers();
         setUsers(users);
      };

      fetchData();
   }, []);

   const handleFirstSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFirstUserId(e.target.value);
   };

   const handleSecondSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSecondUserId(e.target.value);
   };

   const handleButton = () => {
      getHammingMetrics(firstUserId, secondUserId);
      console.log(hammingMetric);
   };

   return (
      <>
         <section className="hamming-page">
            <div className="hamming-page__controls">
               <select id="firstSelect" value={firstUserId} onChange={handleFirstSelect}>
                  {users.map((user) => (
                     <option key={user.googleId} value={user.googleId}>
                        {user.firstName}
                     </option>
                  ))}
               </select>

               <select id="secondSelect" value={secondUserId} onChange={handleSecondSelect}>
                  {users.map((user) => (
                     <option key={user.googleId} value={user.googleId}>
                        {user.firstName}
                     </option>
                  ))}
               </select>

               <button className="hamming-page__btn" onClick={handleButton}>
                  Calculate
               </button>
            </div>

            <div className="hamming-page__tables">
               <table className="hamming-page__table">
                  <thead>
                     <tr>
                        <th colSpan={hammingMetric?.vector1?.length || 1}>Користувач 1</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        {hammingMetric?.vector1?.map((value, index) => (
                           <td key={index}>{value}</td>
                        ))}
                     </tr>
                  </tbody>
               </table>

               <table className="hamming-page__table">
                  <thead>
                     <tr>
                        <th colSpan={hammingMetric?.vector1?.length || 1}>Користувач 2</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        {hammingMetric?.vector2?.map((value, index) => (
                           <td key={index}>{value}</td>
                        ))}
                     </tr>
                  </tbody>
               </table>

               <table className="hamming-page__table">
                  <thead>
                     <tr>
                        <th colSpan={hammingMetric?.vector1?.length || 1}>Відстані</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        {hammingMetric?.diffs?.map((value, index) => (
                           <td key={index}>{value}</td>
                        ))}
                     </tr>
                  </tbody>
               </table>

               <table className="hamming-page__table">
                  <thead>
                     <tr>
                        <th>Відстань Хеммінга</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>{hammingMetric.diffs.reduce((acc, val) => acc + val, 0)}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </section>
      </>
   );
};

export default HammingPage;
