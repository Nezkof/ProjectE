import type { Album, PermutationResult } from "../../types/types";
import AlbumCover from "../albumCover/AlbumCover";
import "./permutationsTable.css";

interface Props {
   albums: Album[];
   metric: PermutationResult[];
}

const PermutationsTable = ({ albums, metric }: Props) => {
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
                  {metric[0].usersData.map((element) => (
                     <th key={element.user}>{element.user}</th>
                  ))}
                  <th>Result</th>
               </tr>
            </thead>
            <tbody className="perm-table__body">
               {metric.map((row, index) => (
                  <tr key={index}>
                     {row.permutation.map((element) => (
                        <td key={element}>{element}</td>
                     ))}
                     {row.usersData.map((element, index) => (
                        <td key={index}>{element.userDistance}</td>
                     ))}
                     <td>{row.permutationDistance}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default PermutationsTable;
