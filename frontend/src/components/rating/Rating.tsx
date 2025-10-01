import AlbumCard from "../albumCard/AlbumCard";

import "./rating.css";
import type { Album } from "../../types/types";

import unknownAlbum from "/images/unknownAlbum.png";

interface Props {
   albums: Album[];
}

const Rating = (props: Props) => {
   return (
      <div className="rating-wrapper">
         <ul className="rating-list">
            {props.albums && props.albums.length > 0
               ? props.albums.map((album, index) => (
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
                 ))
               : Array.from({ length: 5 }).map((_, index) => (
                    <AlbumCard
                       key={index}
                       id={0}
                       rank={index + 1}
                       label={"No albums"}
                       author={""}
                       href={"/"}
                       path={unknownAlbum}
                       alt={"No albums"}
                    />
                 ))}
         </ul>
      </div>
   );
};

export default Rating;
