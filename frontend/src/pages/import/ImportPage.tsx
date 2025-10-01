import { useEffect } from "react";
import { useJsonImport } from "../../hooks/useJsonImport";
import "./importPage.css";
import { useAlbumsStore } from "../../hooks/stores/albumStore";
import { useExpertsStore } from "../../hooks/stores/expertsStore";

const ImportPage = () => {
   const { jsonData, openJSONFileDialog, handleJSONFileUpload, jsonFileInputRef } = useJsonImport();

   const addAlbums = useAlbumsStore((state) => state.addAlbums);
   const addExpert = useExpertsStore((state) => state.addExpert);
   const clearExperts = useExpertsStore((state) => state.clearExperts);

   const {
      jsonData: expertsJson,
      openJSONFileDialog: openExpertsJSONFileDialog,
      handleJSONFileUpload: handleExpertsJSONFileUpload,
      jsonFileInputRef: expertsJsonFileInputRef,
   } = useJsonImport();

   useEffect(() => {
      if (!jsonData) return;

      if (Array.isArray(jsonData)) {
         addAlbums(jsonData);
         window.location.href = "/rating";
      }
   }, [jsonData, addAlbums]);

   useEffect(() => {
      if (!expertsJson) return;

      if (Array.isArray(expertsJson)) {
         clearExperts();
         expertsJson.forEach((expert) => addExpert(expert));
      }
   }, [expertsJson, addExpert]);

   return (
      <section className="import-page">
         <button className="import-page__button" onClick={openJSONFileDialog}>
            Load data from .JSON
         </button>

         <button className="import-page__button" onClick={openExpertsJSONFileDialog}>
            Load experts .JSON
         </button>

         <input
            type="file"
            accept=".json"
            ref={jsonFileInputRef}
            style={{ display: "none" }}
            onChange={handleJSONFileUpload}
         />

         <input
            type="file"
            accept=".json"
            ref={expertsJsonFileInputRef}
            style={{ display: "none" }}
            onChange={handleExpertsJSONFileUpload}
         />
      </section>
   );
};

export default ImportPage;
