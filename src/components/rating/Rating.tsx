import AlbumCard from "../albumCard/AlbumCard";
import BOFGBGFM from "/covers/bo-fgbgfm.webp";

import "./rating.css";
import { useEffect } from "react";

const Rating = () => {
   return (
      <>
         <div className="rating-wrapper">
            {/* <div className="rating-list__mask"></div> */}

            <ul className="rating-list">
               <AlbumCard
                  label="Finding God Before God Finds Me"
                  author="Bad Omens"
                  href={BOFGBGFM}
                  path={BOFGBGFM}
                  alt={BOFGBGFM}
               />
               <AlbumCard
                  label="Finding God Before God Finds Me"
                  author="Bad Omens"
                  href={BOFGBGFM}
                  path={BOFGBGFM}
                  alt={BOFGBGFM}
               />

               <AlbumCard
                  label="Finding God Before God Finds Me"
                  author="Bad Omens"
                  href={BOFGBGFM}
                  path={BOFGBGFM}
                  alt={BOFGBGFM}
               />
               <AlbumCard
                  label="Finding God Before God Finds Me"
                  author="Bad Omens"
                  href={BOFGBGFM}
                  path={BOFGBGFM}
                  alt={BOFGBGFM}
               />
               <AlbumCard
                  label="Finding God Before God Finds Me"
                  author="Bad Omens"
                  href={BOFGBGFM}
                  path={BOFGBGFM}
                  alt={BOFGBGFM}
               />
               <AlbumCard
                  label="Finding God Before God Finds Me"
                  author="Bad Omens"
                  href={BOFGBGFM}
                  path={BOFGBGFM}
                  alt={BOFGBGFM}
               />
               <AlbumCard
                  label="Finding God Before God Finds Me"
                  author="Bad Omens"
                  href={BOFGBGFM}
                  path={BOFGBGFM}
                  alt={BOFGBGFM}
               />
               <AlbumCard
                  label="Finding God Before God Finds Me"
                  author="Bad Omens"
                  href={BOFGBGFM}
                  path={BOFGBGFM}
                  alt={BOFGBGFM}
               />
            </ul>
         </div>
      </>
   );
};

export default Rating;
