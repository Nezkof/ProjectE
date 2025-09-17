import AlbumCard from "../albumCard/AlbumCard";

import "./rating.css";
import type { Album } from "../../types/types";

interface Props {
   albums: Album[];
}

const Rating = (props: Props) => {
   return (
      <>
         <div className="rating-wrapper">
            {/* <div className="rating-list__mask"></div> */}

            <ul className="rating-list">
               {props.albums.map((album, index) => (
                  <AlbumCard
                     key={album.id}
                     id={album.id}
                     rank={index + 1}
                     label={album.title}
                     author={album.artist}
                     href={album.link}
                     path={album.cover}
                     alt={album.title}
                  />
               ))}
            </ul>
         </div>
      </>
   );
};

export default Rating;
