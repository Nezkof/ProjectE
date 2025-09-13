import { useEffect } from "react";
import { useCsvImport } from "../../hooks/useCSVImport";
import { useJsonImport } from "../../hooks/useJsonImport";
import "./importPage.css";
import { useAlbumsStore } from "../../hooks/stores/useAlbumsStore";

const ImportPage = () => {
   const { jsonData, openJSONFileDialog, handleJSONFileUpload, jsonFileInputRef } = useJsonImport();
   const { csvData, openCSVFileDialog, handleCSVFileUpload, csvFileInputRef } = useCsvImport();
   const { albums, addAlbum, removeAlbum, updateAlbum, clearAlbums } = useAlbumsStore();

   useEffect(() => {
      if (!jsonData) return;

      if (Array.isArray(jsonData)) {
         clearAlbums();
         jsonData.forEach((album) => addAlbum(album));
      }
   }, [jsonData]);

   return (
      <section className="import-page">
         <button className="import-page__button" onClick={openJSONFileDialog}>
            Load data from .JSON
         </button>

         <button className="import-page__button" onClick={openCSVFileDialog}>
            Load data from .CSV
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
      </section>
   );
};

export default ImportPage;
