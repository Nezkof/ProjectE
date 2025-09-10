import { useState } from "react";
import AlbumCover from "../albumCover/AlbumCover";
import "./albumComparator.css";

import BOFGBGFM from "/covers/bo-fgbgfm.webp";

const AlbumComparator = () => {
   const [currentPair, setCurrentPair] = useState(1);
   const [pairsAmount, setPairsAmount] = useState(20);

   return (
      <>
         <ul className="album-comparator">
            <li>
               <AlbumCover
                  className="album-cover--small-play album-cover--medium album-cover--hover"
                  href=""
                  path={BOFGBGFM}
                  alt={BOFGBGFM}
               ></AlbumCover>
            </li>
            <li>
               <AlbumCover
                  className="album-cover--small-play album-cover--medium album-cover--hover"
                  href=""
                  path={BOFGBGFM}
                  alt={BOFGBGFM}
               ></AlbumCover>
            </li>
         </ul>

         <span className="album-comparator__counter">
            {currentPair} / {pairsAmount}
         </span>
      </>
   );
};

export default AlbumComparator;
