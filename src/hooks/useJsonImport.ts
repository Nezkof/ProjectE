import { useRef, useState } from "react";

export function useJsonImport<T = unknown>() {
   const jsonFileInputRef = useRef<HTMLInputElement | null>(null);
   const [jsonData, setJsonData] = useState<T | null>(null);

   const openJSONFileDialog = () => {
      jsonFileInputRef.current?.click();
   };

   const handleJSONFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
         try {
            const result = e.target?.result;
            if (typeof result === "string") {
               const parsedData: T = JSON.parse(result);
               setJsonData(parsedData);
            }
         } catch (err) {
            alert("Error reading JSON");
         }
      };
      reader.readAsText(file);
   };

   return {
      jsonData,
      openJSONFileDialog,
      handleJSONFileUpload,
      jsonFileInputRef,
   };
}
