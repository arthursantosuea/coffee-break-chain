import { X } from "lucide-react";
import Modal from "react-modal";
import { IData } from "../../pages/Home";
import { sortClassifications } from "../../utils/sortClassifications";
import { useEffect, useState } from "react";

Modal.setAppElement("#root");

export interface IResultClassificationPopUp {
  isOpen: boolean;
  resultImage: string | undefined;
  results: IData | undefined;
  onCloseModal: () => void;
}

export function ResultClassificationPopUp({
  isOpen,
  resultImage,
  results,
  onCloseModal,
}: IResultClassificationPopUp) {
  const [classifications, setClassifications] = useState<[string, number][]>();

  function closeModal() {
    onCloseModal();
  }
  useEffect(() => {
    if (results) {
      const sortedClassifications = Object.entries(sortClassifications(results));
      setClassifications(sortedClassifications);


      console.log(classifications);
    }
  }, [results]);
  
  // const 
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center text-white"
    >
      <div className="max-w-[25vw] max-h-[80%] bg-light-dark rounded-md">
        <header className="flex justify-between items-center p-4">
          <h1 className="font-bold text-2xl">Resultado</h1>
          <X onClick={closeModal} className="cursor-pointer" />
        </header>
        <main className="flex flex-col p-4">
          <img
            src={resultImage}
            alt="Result of the classification"
            className="aspect-video rounded-md"
          />
          <div className="h-16 w-full bg-light-red mt-6 rounded-md flex items-center justify-center font-bold text-2xl">
            {results && classifications?.map((classification, index) => (
              index == 0 && <p className="text-white">{`${classification[1]}%  ${classification[0]}`}</p>
             ))}
          </div>
          <table className="bg-white bg-opacity-10 mt-6 rounded-md w-full">
            <tr>
              <th className="p-4">Outros resultados</th>
            </tr>
            <tr className="flex flex-col items-center mb-6">
              {results && classifications?.map(
                (classification, index) =>
                  index > 0 && (
                    <td className="border-t-2 w-[80%] border-[#ffffff3f] text-center p-2" key={index}>
                      {` ${classification[1]}% ${classification[0]}`}
                    </td>
              ))}
            </tr>
          </table>
        </main>
      </div>
    </Modal>
  );
}
