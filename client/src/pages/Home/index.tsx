import { useState } from "react";
import logo from "../../assets/logo.svg";

import { InputField } from "../../components/InputField";
import { Loader } from "../../components/Loader";
import { ResultClassificationPopUp } from "../../components/ResultClassificationPopUp";
import { Button } from "../../components/Button";
import { DragAndDrop } from "../../components/DragAndDrop";

import base64 from "base64-encode-file";
import axios from "axios";
export interface IData {
  [key: string]: number;
}

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [plantId, setPlantId] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [image, setImage] = useState<string | undefined>();

  const [data, setData] = useState<IData | undefined>();

  function onCloseModal() {
    setIsOpen(false);
    setFile(undefined);
    setPlantId("");
  }

  async function handleOnSubmit(event: React.FormEvent) {
    event.preventDefault();

    setIsLoading(true);

    const base64Image = await base64(file);
    setImage(String(base64Image));

    await axios
      .post("http://localhost:5000/classifier", { plantId, base64Image })
      .then((response) => {
        setIsLoading(false);
        setIsOpen(true);
        setData(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }

  return (
    <article className="w-full min-h-screen overflow-x-hidden bg-primary-dark flex flex-col items-center text-white font-sans p-12">
      <header className=" flex flex-col justify-center items-center">
        <aside className="flex flex-col items-center">
          <img src={logo} alt="Coffee Break Logo" className="mb-4" />
          <h1 className="font-bold text-4xl flex items-center">
            coffee<strong className="text-light-red">break</strong>
          </h1>
        </aside>
        <hgroup className="flex flex-col items-center mt-12">
          <h2 className="font-bold">
            Descubra nosso inovador classificador de doenças de café!
          </h2>
          <p className="text-xs mt-6 text-center">
            Detecte e controle doenças em suas plantas de café com nosso
            inovador classificador baseado em aprendizado de máquina. <br />
            Aumente a produtividade e mantenha suas plantas saudáveis.
            Experimente agora mesmo!
          </p>
        </hgroup>
      </header>
      <main>
        <form onSubmit={handleOnSubmit}>
          <InputField
            label="Identificador da folha"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPlantId(event.target.value)
            }
          />
          <Loader isLoading={isLoading} />
          <DragAndDrop file={file} onChangeFile={setFile} />

          {plantId && file ? (
            <Button name="Classificar" />
          ) : (
            <Button name="Classificar" disabled={true} />
          )}
          <ResultClassificationPopUp
            isOpen={isOpen}
            resultImage={image}
            results={data}
            onCloseModal={onCloseModal}
          />
        </form>
      </main>
    </article>
  );
}
