import { useEffect } from "react";
import { useJsonImport } from "../../hooks/useJsonImport";
import "./importPage.css";
import { useAlbumsStore } from "../../hooks/stores/albumStore";
import { useMatrixStore } from "../../hooks/stores/matrixStore";
import { useIgnoredAlbumsStore } from "../../hooks/stores/ignoredAlbumsStore";

const ImportPage = () => {
   const { jsonData, openJSONFileDialog, handleJSONFileUpload, jsonFileInputRef } = useJsonImport();

   const addAlbums = useAlbumsStore((state) => state.addAlbums);
   const removeAll = useMatrixStore((state) => state.removeAll);
   const clearStore = useIgnoredAlbumsStore((state) => state.clearStore);

   useEffect(() => {
      if (!jsonData) return;

      if (Array.isArray(jsonData)) {
         addAlbums(jsonData);
         removeAll();
         clearStore();
         // window.location.href = "/rating";
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
