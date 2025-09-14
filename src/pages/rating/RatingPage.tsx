import AlbumCover from "../../components/albumCover/AlbumCover";
import Rating from "../../components/rating/Rating";

import "./ratingPage.css";
import { useTournamentStore } from "../../hooks/stores/useTournamentStore";

const RatingPage = () => {
   const { rankedAlbums } = useTournamentStore();

   return (
      <>
         <section className="rating-page">
            <h1 className="rating-page__header">Music album ratings</h1>
            <div className="rating-page__container">
               <AlbumCover
                  href={rankedAlbums[0].link}
                  path={rankedAlbums[0].cover}
                  alt={rankedAlbums[0].title}
               />
               <Rating albums={rankedAlbums}></Rating>
            </div>
         </section>
      </>
   );
};

export default RatingPage;
