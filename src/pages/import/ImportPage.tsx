import { useEffect } from "react";
import { useCsvImport } from "../../hooks/useCSVImport";
import { useJsonImport } from "../../hooks/useJsonImport";
import "./importPage.css";
import { useAlbumsStore } from "../../hooks/stores/albumStore";
import { useExpertsStore } from "../../hooks/stores/expertsStore";

const ImportPage = () => {
   const { jsonData, openJSONFileDialog, handleJSONFileUpload, jsonFileInputRef } = useJsonImport();
   const { openCSVFileDialog, handleCSVFileUpload, csvFileInputRef } = useCsvImport();

   const addAlbum = useAlbumsStore((state) => state.addAlbum);
   const clearAlbums = useAlbumsStore((state) => state.clearAlbums);
   const addExperts = useExpertsStore((state) => state.addExperts);

   const {
      jsonData: expertsJson,
      openJSONFileDialog: openExpertsJSONFileDialog,
      handleJSONFileUpload: handleExpertsJSONFileUpload,
      jsonFileInputRef: expertsJsonFileInputRef,
   } = useJsonImport();

   useEffect(() => {
      if (!jsonData) return;

      if (Array.isArray(jsonData)) {
         clearAlbums();
         jsonData.forEach((album) => addAlbum(album));
      }
   }, [jsonData, clearAlbums, addAlbum]);

   useEffect(() => {
      if (!expertsJson) return;

      if (typeof expertsJson === "object" && "expertsAmount" in expertsJson) {
         addExperts((expertsJson as { expertsAmount: number }).expertsAmount);
      }
   }, [expertsJson, addExperts]);

   return (
      <section className="import-page">
         <button className="import-page__button" onClick={openJSONFileDialog}>
            Load data from .JSON
         </button>

         <button className="import-page__button" onClick={openCSVFileDialog}>
            Load data from .CSV
         </button>

         <button className="import-page__button" onClick={openExpertsJSONFileDialog}>
            Load experts .JSON
         </button>

         <input
            type="file"
            accept=".csv"
            ref={csvFileInputRef}
            style={{ display: "none" }}
            onChange={handleCSVFileUpload}
         />

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
