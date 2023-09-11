import React from "react";
import Modal from "react-modal";
import { LoaderIcon } from "lucide-react";

Modal.setAppElement("#root");

export function Loader({ isLoading }) {
  return (
    <Modal
      isOpen={isLoading}
      className="w-screen min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center justify-center"
    >
      <p className="mb-8">Aguarde, estamos detectando a saúde da folha...</p>
      <LoaderIcon className="animate-spin" />
    </Modal>
  );
}