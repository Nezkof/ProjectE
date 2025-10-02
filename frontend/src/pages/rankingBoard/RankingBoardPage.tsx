import RankingBoard from "../../components/rankingBoard/RankingBoard";
import { useRanking } from "../../hooks/useRanking";

import "./rankingBoardPage.css";

const RankingBoardPage = () => {
   const { rankedAlbums, updateAlbumPosition } = useRanking();

return (
      <section className="ranking-board-page">
         <h1 className="ranking-board-page__title">Which album is better for you?</h1>
         <RankingBoard rankedAlbums={rankedAlbums} updateAlbumPosition={updateAlbumPosition} />
      </section>
   );
};

export default RankingBoardPage;
