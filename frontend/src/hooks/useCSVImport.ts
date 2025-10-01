import { useRef, useState } from "react";

export function useCsvImport() {
   const csvFileInputRef = useRef<HTMLInputElement | null>(null);
   const [csvData, setCsvData] = useState<string[][] | null>(null);

   const openCSVFileDialog = () => {
      csvFileInputRef.current?.click();
   };

   const handleCSVFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.type !== "text/csv") {
         alert("Please, select .csv file");
         return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
         try {
            const result = e.target?.result;
            if (typeof result === "string") {
               const rows = result
                  .trim()
                  .split("\n")
                  .map((row) => row.split(",").map((cell) => cell.trim()));

               setCsvData(rows);
               console.log("CSV data:", rows);
            }
         } catch (err) {
            alert("Error reading CSV");
         }
      };
      reader.readAsText(file);
   };

   return {
      csvData,
      openCSVFileDialog,
      handleCSVFileUpload,
      csvFileInputRef,
   };
}
