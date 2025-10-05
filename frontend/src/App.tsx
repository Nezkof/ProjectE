import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import RankingBoardPage from "./pages/rankingBoard/RankingBoardPage";
import RatingPage from "./pages/rating/RatingPage";
import ImportPage from "./pages/import/ImportPage";
// import ExpertsButtons from "./components/expertsButtons/ExpertsButtons";
import ControlButtons from "./components/controlButtons/ControlButtons";
import DecisionPage from "./pages/decision/DecisionPage";
import Login from "./components/login/Login";
import MetricsPage from "./pages/metrics/MetricsPage";
import HammingPage from "./pages/hammingPage/HammingPage";

function App() {
   return (
      <Router>
         <main>
            <Login />
            <ControlButtons />
            {/* <ExpertsButtons /> */}
            <Routes>
               <Route path="/" element={<RatingPage />} />
               <Route path="/cook" element={<MetricsPage />} />
               <Route path="/hamming" element={<HammingPage />} />
               <Route path="/import" element={<ImportPage />} />
               <Route path="/rating" element={<RankingBoardPage />} />
               <Route path="/decision" element={<DecisionPage />} />
            </Routes>
         </main>
      </Router>
   );
}

export default App;
