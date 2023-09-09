import { FileUploader } from "react-drag-drop-files";

import upload from "../../assets/upload.svg";
import { Trash2Icon } from "lucide-react";

import base64 from "base64-encode-file";
import { useState } from "react";
interface IDragAndDropProps {
  // base64Image?: string;
  file: File | undefined;
  onChangeFile: (file: File | undefined) => void;
}

export function DragAndDrop({
  file,
  onChangeFile,
}: IDragAndDropProps) {
  const fileTypes = ["JPG", "PNG"];
  
  const [image, setImage] = useState("");
  
  async function handleChange(currentFile: File) {
    const base64Image = await base64(currentFile);
    setImage(String(base64Image));
    onChangeFile(currentFile);
  }
  

  return (
    <div className="mt-6">
      {file ? (
        <header className="flex justify-between">
          <p className="text-sm mb-2">Foto da folha</p>
          <Trash2Icon
            onClick={() => onChangeFile(undefined)}
            className="cursor-pointer hover:opacity-90"
            width={20}
          />
        </header>
      ) : (
        <p className="text-sm mb-2">Foto da folha</p>
      )}

      <FileUploader handleChange={handleChange} types={fileTypes}>
        <div className="h-80 w-[489px] flex flex-col items-center relative justify-center bg-light-red bg-opacity-20 border-dashed border-2 rounded-md border-opacity-50 border-spacing-2">
          {file ? (
            <>
              <img src={image} className="w-full h-full opacity-50"/>
            </>
          ) : (
            <>
              <img src={upload} alt="Upload file icon" className="mb-8" />
              <h1 className="font-bold text-base">
                Selecione uma imagem para fazer upload
              </h1>
              <p className="text-xs">ou arraste e solte uma imagem aqui</p>
            </>
          )}
        </div>
      </FileUploader>
    </div>
  );
}

