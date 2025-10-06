import type { Album, PermutationResult } from "../../types/types";
import AlbumCover from "../albumCover/AlbumCover";
import "./permutationsTable.css";

interface Props {
   albums: Album[];
   additiveRankingIndex: number;
   minmaxRankingIndex: number;
   hammingRankingIndex: number;
   permutationsData: PermutationResult[];
}

const PermutationsTable = ({
   albums,
   permutationsData,
   additiveRankingIndex,
   minmaxRankingIndex,
   hammingRankingIndex,
}: Props) => {
   const isMinmax = (index: number) => {
      return index === minmaxRankingIndex ? "perm-table__row--minmax" : "";
   };

   const isAdditive = (index: number) => {
      return index === additiveRankingIndex ? "perm-table__row--additive" : "";
   };

   const isHamming = (index: number) => {
      return index === hammingRankingIndex ? "perm-table__row--hamming" : "";
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
                     <th key={element.user}>{element.user} Cook</th>
                  ))}
                  {permutationsData[0].distances.map((element) => (
                     <th key={element.user}>{element.user} Hamming</th>
                  ))}
                  <th>Sum Cook</th>
                  <th>Max Cook</th>
                  <th>Min Hamming</th>
               </tr>
            </thead>
            <tbody className="perm-table__body">
               {permutationsData.map((permutationData, index) => (
                  <tr
                     key={index}
                     className={`${isMinmax(index)} ${isAdditive(index)} ${isHamming(index)}`}
                  >
                     {permutationData.permutation.map((element) => (
                        <td key={element}>{element}</td>
                     ))}
                     {permutationData.distances.map((element, index) => (
                        <td key={index}>{element.cookDistance}</td>
                     ))}
                     {permutationData.distances.map((element, index) => (
                        <td key={index}>{element.hammingDistance}</td>
                     ))}
                     <td>{permutationData.sum}</td>
                     <td>{permutationData.maxl}</td>
                     <td>{permutationData.hammingDistance}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default PermutationsTable;
