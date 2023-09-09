import { LoaderIcon } from "lucide-react";
import Modal from "react-modal";

interface ILoaderProps{
    isLoading: boolean;
}
Modal.setAppElement("#root")

export function Loader({isLoading}: ILoaderProps) {
  return (
    <Modal isOpen={isLoading} className="w-screen min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center justify-center">
      <p className="mb-8">Aguarde, estamos detectando a saúde da folha...</p>
      <LoaderIcon className="animate-spin" />
    </Modal>
  );
}
