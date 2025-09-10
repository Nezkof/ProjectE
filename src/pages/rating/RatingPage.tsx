import AlbumCover from "../../components/albumCover/AlbumCover";
import Rating from "../../components/rating/Rating";

import BOFGBGFM from "/covers/bo-fgbgfm.webp";

import "./ratingPage.css";

const RatingPage = () => {
   return (
      <>
         <section className="rating-page">
            <h1 className="rating-page__header">Music album ratings</h1>
            <div className="rating-page__container">
               <AlbumCover href="" path={BOFGBGFM} alt={BOFGBGFM}></AlbumCover>
               <Rating></Rating>
            </div>
         </section>
      </>
   );
};

export default RatingPage;
