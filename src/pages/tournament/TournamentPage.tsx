import AlbumComparator from "../../components/albumComparator/AlbumComparator";

import "./tournamentPage.css";

const TournamentPage = () => {
   return (
      <section className="tournament-page">
         <h1 className="tournament-page__header">Which album is better for you?</h1>
         <AlbumComparator></AlbumComparator>
      </section>
   );
};

export default TournamentPage;
