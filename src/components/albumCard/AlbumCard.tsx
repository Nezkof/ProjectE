import AlbumCover from "../albumCover/AlbumCover";

import "./albumCard.css";
import { useUnnecessaryAlbumsStore } from "../../hooks/stores/unnecessaryAlbums";
import { useExpertsStore } from "../../hooks/stores/expertsStore";

interface Props {
   rank?: number;
   id: number;
   isDragable?: boolean;
   label: string;
   author: string;
   href: string;
   path: string;
   alt: string;
}

const AlbumCard = (props: Props) => {
   const addUnnecessaryAlbum = useUnnecessaryAlbumsStore((state) => state.addUnnecessaryAlbum);
   const removeUnnecessaryAlbum = useUnnecessaryAlbumsStore(
      (state) => state.removeUnnecessaryAlbum
   );
   const isAlbumUnnecessary = useUnnecessaryAlbumsStore((state) => state.isAlbumUnnecessary);
   const unnecessaryAlbums = useUnnecessaryAlbumsStore((state) => state.unnecessaryAlbums);
   const currentExpertId = useExpertsStore((state) => state.currentExpertId);

   const isUnnecessary = unnecessaryAlbums.get(props.id)?.includes(currentExpertId);

   const handleDeleteBtn = () => {
      if (isAlbumUnnecessary(currentExpertId, props.id)) {
         removeUnnecessaryAlbum(currentExpertId, props.id);
      } else {
         addUnnecessaryAlbum(currentExpertId, props.id);
      }
   };

   return (
      <>
         <div className={`album-card ${isUnnecessary ? "album-card--unnecessary" : ""}`}>
            {props.rank && <span className="album-card__number">{props.rank}</span>}
            <AlbumCover
               className="album-card__cover album-cover--small"
               href={props.href}
               path={props.path}
               alt={props.alt}
            ></AlbumCover>
            <div className="album-card__info">
               <h2 className="album-card__label">{props.label}</h2>
               <h3 className="album-card__author">{props.author}</h3>
            </div>

            {props.isDragable && (
               <button className="album-card__delete-btn" onClick={handleDeleteBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                     <path d="M18 6 6 18" />
                     <path d="m6 6 12 12" />
                  </svg>
               </button>
            )}

            {props.isDragable && (
               <button className="album-card__drag-button">
                  <svg
                     width="32"
                     height="26"
                     viewBox="0 0 32 26"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path d="M3 5H29" />
                     <path d="M3 13H29" />
                     <path d="M3 21H29" />
                  </svg>
               </button>
            )}
         </div>
      </>
   );
};

export default AlbumCard;
