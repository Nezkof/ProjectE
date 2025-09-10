import RankingBoard from "../../components/rankingBoard/RankingBoard";

import "./rankingBoardPage.css";

const RankingBoardPage = () => {
   return (
      <section className="ranking-board-page">
         <h1 className="ranking-board-page__title">Which album is better for you?</h1>
         <button className="ranking-board-page__confirm-btn">Confirm</button>
         <RankingBoard></RankingBoard>
      </section>
   );
};

export default RankingBoardPage;
