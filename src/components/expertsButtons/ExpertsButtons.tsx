import { useExpertsStore } from "../../hooks/stores/useExpertsStore";
import Button from "../button/Button";
import "./expertsButtons.css";

const ExpertsButtons = () => {
   const { currentExpertId, expertsIdxs, setCurrentExpertId } = useExpertsStore();

   return (
      <>
         <aside className="experts-buttons">
            {expertsIdxs.map((idx) => (
               <Button
                  key={idx}
                  text={String(idx)}
                  onClick={() => setCurrentExpertId(idx)}
                  className={currentExpertId === idx ? ["active"] : [""]}
               />
            ))}
         </aside>
      </>
   );
};

export default ExpertsButtons;
