import RankingBoard from "../../components/rankingBoard/RankingBoard";
import { useRanking } from "../../hooks/useRanking";

import "./rankingBoardPage.css";

const RankingBoardPage = () => {
   const { ratingConfirm } = useRanking();

   return (
      <section className="ranking-board-page">
         <h1 className="ranking-board-page__title">Which album is better for you?</h1>
         <button className="ranking-board-page__confirm-btn" onClick={ratingConfirm}>
            Confirm
         </button>
         <RankingBoard></RankingBoard>
      </section>
   );
};

export default RankingBoardPage;
