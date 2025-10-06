import { useEffect } from "react";
import { useJsonImport } from "../../hooks/useJsonImport";
import "./importPage.css";
import { useAlbumsStore } from "../../hooks/stores/albumStore";
import { useIgnoredAlbumsStore } from "../../hooks/stores/ignoredAlbumsStore";
import { useRankedAlbumsStore } from "../../hooks/stores/rankedAlbumsStore";

const ImportPage = () => {
   const { jsonData, openJSONFileDialog, handleJSONFileUpload, jsonFileInputRef } = useJsonImport();

   const setAlbums = useAlbumsStore((state) => state.setAlbums);
   const clearIgnoredStore = useIgnoredAlbumsStore((state) => state.clearStore);
   const clearRankedStore = useRankedAlbumsStore((state) => state.clearStore);

   useEffect(() => {
      if (!jsonData) return;

      if (Array.isArray(jsonData)) {
         setAlbums(jsonData);
         clearIgnoredStore();
         clearRankedStore();
         // window.location.href = "/rating";
      }
   }, [jsonData, setAlbums]);

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
