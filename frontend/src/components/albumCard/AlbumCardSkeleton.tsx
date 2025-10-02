import "./albumCard.css";

const AlbumCardSkeleton = () => {
   return (
      <>
         <div className={`album-card`}>
            <div className="album-card__number album-card__number--empty"></div>
            <div className="album-card__cover album-card__cover--empty"></div>
            <div className="album-card__info">
               <div className="album-card__label album-card__label--empty"></div>
               <div className="album-card__author album-card__author--empty"></div>
            </div>
         </div>
      </>
   );
};

export default AlbumCardSkeleton;
