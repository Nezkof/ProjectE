import AlbumCover from "../albumCover/AlbumCover";
import "./albumComparator.css";

import { useTournament } from "../../hooks/useTournament";

const AlbumComparator = () => {
   const { compareAlbums, getLeftAlbum, getRightAlbum, getCurrPairIdx, getPairsAmount } =
      useTournament();

   return (
      <>
         <ul className="album-comparator">
            <li className="album-comparator__item">
               <button
                  className="album-comparator__select-btn"
                  onClick={() => compareAlbums(getLeftAlbum().id, getRightAlbum().id)}
               >
                  <AlbumCover
                     className="album-cover--small-play album-cover--medium album-cover--hover"
                     href={getLeftAlbum().link}
                     path={getLeftAlbum().cover}
                     alt={getLeftAlbum().title}
                  />
                  <h2 className="album_comparator__item-title">{getLeftAlbum().title}</h2>
                  <h3 className="album_comparator__item-artist">{getLeftAlbum().artist}</h3>
               </button>
            </li>
            <li className="album-comparator__item">
               <button
                  className="album-comparator__select-btn"
                  onClick={() => compareAlbums(getRightAlbum().id, getLeftAlbum().id)}
               >
                  <AlbumCover
                     className="album-cover--small-play album-cover--medium album-cover--hover"
                     href={getRightAlbum().link}
                     path={getRightAlbum().cover}
                     alt={getRightAlbum().title}
                  />
                  <h2 className="album_comparator__item-title">{getRightAlbum().title}</h2>
                  <h3 className="album_comparator__item-artist">{getRightAlbum().artist}</h3>
               </button>
            </li>
         </ul>

         <span className="album-comparator__counter">
            {getCurrPairIdx()} / {getPairsAmount()}
         </span>
      </>
   );
};

export default AlbumComparator;
