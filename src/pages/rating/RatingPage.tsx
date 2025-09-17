import AlbumCover from "../../components/albumCover/AlbumCover";
import Rating from "../../components/rating/Rating";
import { useAlbumsStore } from "../../hooks/stores/albumStore";

import "./ratingPage.css";

const RatingPage = () => {
   const rankedAlbums = useAlbumsStore((state) => state.albums);

   return (
      <>
         <section className="rating-page">
            <h1 className="rating-page__header">Music album ratings</h1>
            {rankedAlbums && rankedAlbums.length > 0 && (
               <div className="rating-page__container">
                  <AlbumCover
                     href={rankedAlbums[0].link}
                     path={rankedAlbums[0].cover}
                     alt={rankedAlbums[0].title}
                  />
                  <Rating albums={rankedAlbums}></Rating>
               </div>
            )}
         </section>
      </>
   );
};

export default RatingPage;
