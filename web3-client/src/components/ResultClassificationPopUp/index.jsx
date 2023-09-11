import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import { sortClassifications } from "../../utils/sortClassifications";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

export function ResultClassificationPopUp({
  isOpen,
  resultImage,
  results,
  onCloseModal,
}) {
  const [classifications, setClassifications] = useState([]);
  const navigate = useNavigate();

  function closeModal() {
    onCloseModal();
  }

  useEffect(() => {
    if (results) {
      const sortedClassifications = Object.entries(
        sortClassifications(results)
      );
      setClassifications(sortedClassifications);
    }
  }, [results]);

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
            {results &&
              results?.map(
                (classification, index) =>
                  index === 0 && (
                    <p className="text-white" key={index}>
                      {`${classification.distribution}%  ${classification.className}`}
                    </p>
                  )
              )}
          </div>
          <table className="bg-white bg-opacity-10 mt-6 rounded-md w-full">
            <thead>
              <tr>
                <th className="p-4">Outros resultados</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex flex-col items-center mb-6">
                {results &&
                  results?.map(
                    (classification, index) =>
                      index > 0 && (
                        <td
                          className="border-t-2 w-[80%] border-[#ffffff3f] text-center p-2"
                          key={index}
                        >
                          {` ${classification.distribution}% ${classification.className}`}
                        </td>
                      )
                  )}
              </tr>
            </tbody>
          </table>
          <button className="w-full h-10 bg-red-500 mt-4 rounded-md" onClick={() => navigate("/classifications")}>
            Visualizar histórico
          </button>
        </main>
      </div>
    </Modal>
  );
}
