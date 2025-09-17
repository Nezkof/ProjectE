import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import RankingBoardPage from "./pages/rankingBoard/RankingBoardPage";
import RatingPage from "./pages/rating/RatingPage";
import ImportPage from "./pages/import/ImportPage";
import ExpertsButtons from "./components/expertsButtons/ExpertsButtons";
import ControlButtons from "./components/controlButtons/ControlButtons";

function App() {
   return (
      <Router>
         <main>
            <ControlButtons />
            <ExpertsButtons />
            <Routes>
               <Route path="/" element={<RatingPage />} />
               <Route path="/import" element={<ImportPage />} />
               <Route path="/rating" element={<RankingBoardPage />} />
            </Routes>
         </main>
      </Router>
   );
}

export default App;
