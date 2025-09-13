import { useEffect, useState } from "react";
import AlbumCover from "../albumCover/AlbumCover";
import "./albumComparator.css";

import { useAlbumsStore } from "../../hooks/stores/useAlbumsStore";

const AlbumComparator = () => {
   const { albums } = useAlbumsStore();

   const createMatrix = () =>
      Array.from({ length: albums.length }, () => Array(albums.length).fill(0));

   const [albumsPairs, setAlbumsPairs] = useState<number[][]>([]);
   const [currPairIdx, setCurrPairIdx] = useState<number>(0);
   const [matrix, setMatrix] = useState<number[][]>(createMatrix);

   function shuffle(array: number[][]) {
      const result = [...array];
      for (let i = result.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
   }

   const formAllPairs = () => {
      const pairs: number[][] = [];
      for (let i = 0; i < albums.length; i++) {
         for (let j = i + 1; j < albums.length; j++) {
            pairs.push([i, j]);
         }
      }
      setAlbumsPairs(shuffle(pairs));
      setCurrPairIdx(0);
   };

   useEffect(() => {
      console.log(albums);

      if (albums.length > 1) {
         formAllPairs();
      }
   }, [albums]);

   if (albumsPairs.length === 0) {
      return <p>Немає достатньо альбомів для порівняння</p>;
   }

   const [leftIdx, rightIdx] = albumsPairs[currPairIdx];

   const rankAlbums = () => {};

   const handleSelectButton = (i: number, j: number) => {
      const newMatrix = matrix.map((row) => [...row]);
      newMatrix[i][j] = 1;
      setMatrix(newMatrix);

      console.log(newMatrix);

      if (currPairIdx === albumsPairs.length - 1) {
         console.log(rankAlbums());
      } else {
         setCurrPairIdx(currPairIdx + 1);
      }
   };

   return (
      <>
         <ul className="album-comparator">
            <li className="album-comparator__item">
               <button
                  className="album-comparator__select-btn"
                  onClick={() =>
                     handleSelectButton(albums[leftIdx].id - 1, albums[rightIdx].id - 1)
                  }
               >
                  <AlbumCover
                     className="album-cover--small-play album-cover--medium album-cover--hover"
                     href={albums[leftIdx].link}
                     path={albums[leftIdx].cover}
                     alt={albums[leftIdx].title}
                  />
                  <h2 className="album_comparator__item-title">{albums[leftIdx].title}</h2>
                  <h3 className="album_comparator__item-artist">{albums[leftIdx].artist}</h3>
               </button>
            </li>
            <li className="album-comparator__item">
               <button
                  className="album-comparator__select-btn"
                  onClick={() =>
                     handleSelectButton(albums[rightIdx].id - 1, albums[leftIdx].id - 1)
                  }
               >
                  <AlbumCover
                     className="album-cover--small-play album-cover--medium album-cover--hover"
                     href={albums[rightIdx].link}
                     path={albums[rightIdx].cover}
                     alt={albums[rightIdx].title}
                  />
                  <h2 className="album_comparator__item-title">{albums[rightIdx].title}</h2>
                  <h3 className="album_comparator__item-artist">{albums[rightIdx].artist}</h3>
               </button>
            </li>
         </ul>

         <span className="album-comparator__counter">
            {currPairIdx + 1} / {albumsPairs.length}
         </span>
      </>
   );
};

export default AlbumComparator;
