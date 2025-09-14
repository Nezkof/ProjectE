import { useState } from "react";
import AlbumCover from "../albumCover/AlbumCover";

import "./albumCard.css";

interface Props {
   rank?: number;
   id?: number;
   isDragable?: boolean;
   label: string;
   author: string;
   href: string;
   path: string;
   alt: string;
}

const AlbumCard = (props: Props) => {
   return (
      <>
         <div className="album-card">
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
