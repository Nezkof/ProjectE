import type { Album, PermutationResult } from "../../types/types";
import AlbumCover from "../albumCover/AlbumCover";
import "./permutationsTable.css";

interface Props {
   albums: Album[];
   additiveRankingIndex: number;
   minmaxRankingIndex: number;
   permutationsData: PermutationResult[];
}

const PermutationsTable = ({
   albums,
   permutationsData,
   additiveRankingIndex,
   minmaxRankingIndex,
}: Props) => {
   const isMinmax = (index: number) => {
      return index === minmaxRankingIndex ? "perm-table__row--minmax" : "";
   };

   const isAdditive = (index: number) => {
      return index === additiveRankingIndex ? "perm-table__row--additive" : "";
   };

   return (
      <>
         <table className="perm-table">
            <thead className="perm-table__head">
               <tr>
                  {albums.map((album) => (
                     <th key={album.id}>
                        <AlbumCover
                           className="album-card__cover album-cover--little"
                           href={album.link}
                           path={album.cover}
                           alt={album.title}
                        ></AlbumCover>
                     </th>
                  ))}
                  {permutationsData[0].distances.map((element) => (
                     <th key={element.user}>{element.user}</th>
                  ))}
                  <th>Sum</th>
                  <th>Max</th>
               </tr>
            </thead>
            <tbody className="perm-table__body">
               {permutationsData.map((permutationData, index) => (
                  <tr key={index} className={`${isMinmax(index)} ${isAdditive(index)}`}>
                     {permutationData.permutation.map((element) => (
                        <td key={element}>{element}</td>
                     ))}
                     {permutationData.distances.map((element, index) => (
                        <td key={index}>{element.distance}</td>
                     ))}
                     <td>{permutationData.sum}</td>
                     <td>{permutationData.maxl}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default PermutationsTable;
