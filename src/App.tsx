import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import ControlButtons from "./components/controlButtons/ControlButtons";
import RankingBoardPage from "./pages/rankingBoard/RankingBoardPage";
import RatingPage from "./pages/rating/RatingPage";
import TournamentPage from "./pages/tournament/TournamentPage";
import ImportPage from "./pages/import/ImportPage";

function App() {
   return (
      <Router>
         <main>
            <ControlButtons />
            <Routes>
               <Route path="/" element={<RatingPage />} />
               <Route path="/import" element={<ImportPage />} />
               <Route path="/rating" element={<RankingBoardPage />} />
               <Route path="/tournament" element={<TournamentPage />} />
            </Routes>
         </main>
      </Router>
   );
}

export default App;
