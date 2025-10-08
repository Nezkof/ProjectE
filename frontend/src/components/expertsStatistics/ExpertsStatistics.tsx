import type { ExpertStatistics } from "../../types/types";

interface Props {
   expertsStats: ExpertStatistics[];
}

const ExpertsStatistics = ({ expertsStats }: Props) => {
   return (
      <>
         <table className="perm-table">
            <thead className="perm-table__head">
               <tr>
                  <th>Expert</th>
                  <th>Distance</th>
                  <th>Ratio</th>
                  <th>Normalized %</th>
                  <th>Ideal %</th>
               </tr>
            </thead>
            <tbody className="perm-table__body">
               {expertsStats.map((row) => (
                  <tr key={row.name}>
                     <td>{row.name}</td>
                     <td>{row.distance.toFixed(2)}</td>
                     <td>{row.ratio.toFixed(2)}</td>
                     <td>{(row.normalized * 100).toFixed(2)}</td>
                     <td>{(row.ideal * 100).toFixed(2)}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default ExpertsStatistics;
