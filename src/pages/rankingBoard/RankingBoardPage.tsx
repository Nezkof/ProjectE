import { useEffect } from "react";
import RankingBoard from "../../components/rankingBoard/RankingBoard";

import "./rankingBoardPage.css";
import { useAlbumsStore } from "../../hooks/stores/useAlbumsStore";

const RankingBoardPage = () => {
   const { albums, addAlbum, removeAlbum, updateAlbum, clearAlbums } = useAlbumsStore();

   useEffect(() => {
      console.log(albums);
   }, []);

   return (
      <section className="ranking-board-page">
         <h1 className="ranking-board-page__title">Which album is better for you?</h1>
         <button className="ranking-board-page__confirm-btn">Confirm</button>
         <RankingBoard albums={albums}></RankingBoard>
      </section>
   );
};

export default RankingBoardPage;
