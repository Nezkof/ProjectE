import { useEffect } from "react";
import { useJsonImport } from "../../hooks/useJsonImport";
import "./importPage.css";
import { useAlbumsStore } from "../../hooks/stores/albumStore";

const ImportPage = () => {
   const { jsonData, openJSONFileDialog, handleJSONFileUpload, jsonFileInputRef } = useJsonImport();

   const addAlbums = useAlbumsStore((state) => state.addAlbums);

   useEffect(() => {
      if (!jsonData) return;

      if (Array.isArray(jsonData)) {
         addAlbums(jsonData);
         window.location.href = "/rating";
      }
   }, [jsonData, addAlbums]);

   return (
      <section className="import-page">
         <button className="import-page__button" onClick={openJSONFileDialog}>
            Load data from .JSON
         </button>

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
