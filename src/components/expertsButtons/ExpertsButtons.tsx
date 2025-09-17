import { useExpertsStore } from "../../hooks/stores/expertsStore";
import { useMatrixStore } from "../../hooks/stores/matrixStore";
import Button from "../button/Button";
import "./expertsButtons.css";

import ExportIcon from "/icons/export.svg";

const ExpertsButtons = () => {
   const currentExpertId = useExpertsStore((state) => state.currentExpertId);
   const expertsIdx = useExpertsStore((state) => state.expertsIdx);
   const setCurrentExpertId = useExpertsStore((state) => state.setCurrentExpertId);
   const evaluationMatrices = useMatrixStore((state) => state.evaluationMatrices);

   const handleExportBtn = () => {
      console.log(evaluationMatrices);

      const json = JSON.stringify(evaluationMatrices, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "evaluationMatrices.json";
      a.click();

      URL.revokeObjectURL(url);
   };

   return (
      <>
         <aside className="experts-buttons">
            {expertsIdx.map((idx) => (
               <Button
                  key={idx}
                  text={String(idx)}
                  onClick={() => setCurrentExpertId(idx)}
                  className={currentExpertId === idx ? ["active"] : [""]}
               />
            ))}
            <Button iconPath={ExportIcon} alt={ExportIcon} onClick={() => handleExportBtn()} />
         </aside>
      </>
   );
};

export default ExpertsButtons;
