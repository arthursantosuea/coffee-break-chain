import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { InputField } from "../../components/InputField";
import { Loader } from "../../components/Loader";
import { ResultClassificationPopUp } from "../../components/ResultClassificationPopUp";
import { Button } from "../../components/Button";
import { DragAndDrop } from "../../components/DragAndDrop";
import base64 from "base64-encode-file";
import axios from "axios";
import { useEffect } from "react";
import {
  getContract,
  initWeb3Server,
  sendLeafData,
} from "../../services/web3service";
import LeafDataStorage from "../../build/contracts/LeafDataStorage.json";

import { parseStringToObjects } from "../../utils/formatStringToArray";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    plantId: "",
    ipfsLink: null,
    classificationData: "",
    date: Math.floor(new Date().getTime() / 1000),
  });
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();

  function onCloseModal() {
    setIsOpen(false);
    setFile(undefined);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    const base64Image = await base64(file);
    setImage(String(base64Image));

    try {
      const [classificationData, ipfsLink] = await Promise.all([
        getLeafClassification(base64Image),
        sendFileToIPFS(file),
      ]);

      setData({
        ...data,
        classificationData,
        ipfsLink,
      });

      console.log(data, classificationData, ipfsLink);
      if (data.ipfsLink != null && data.classificationData != null) {
        await sendLeafData(contract, data, account);
      }

      setIsLoading(false);
      setIsOpen(true);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (data.ipfsLink != null && data.classificationData != null) {
      async function sendDataToContract() {
        await sendLeafData(contract, data, account);
        setIsLoading(false);
        setIsOpen(true);
      }
      sendDataToContract();
    }
  }, [data]);

  useEffect(() => {
    async function init() {
      const web3 = initWeb3Server();

      const contract = await getContract(web3, LeafDataStorage);
      setContract(contract);

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          const currentAccount = accounts[0];
          setAccount(accounts[0]);
          console.log("Conta atual da MetaMask:", currentAccount);
        })
        .catch((error) => {
          console.error("Erro ao obter conta da MetaMask:", error);
        });
    }
    init();
  }, []);

  useEffect(() => {
    window.ethereum.on("accountsChanged", function (newAccounts) {
      if (newAccounts.length === 0) {
        console.log("Nenhuma conta conectada no MetaMask.");
      } else {
        const newUserAccount = newAccounts[0];
        setAccount(newUserAccount);
        console.log("Conta do usuário alterada para:", newUserAccount);
      }
    });
  }, [account]);
  // }

  async function sendFileToIPFS(file) {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary="some boundary"`,
            Authorization: process.env.REACT_APP_PINATA_JWT,
          },
        }
      );

      const ipfsLink = `https://ipfs.io/ipfs/${response.data.IpfsHash}`;
      return ipfsLink;
    } catch (error) {
      console.error("Erro ao enviar arquivo para IPFS:", error.message);
      throw error; // Rejeita a promessa com o erro original
    }
  }
  async function getLeafClassification(base64Image) {
    try {
      const response = await axios.post("http://localhost:5000/classifier", {
        base64Image,
      });

      const classificationData = response.data.toString();
      console.log("Classificação da folha:", classificationData);

      return classificationData;
    } catch (error) {
      console.error("Erro ao obter a classificação da folha:", error.message);
      throw error; // Rejeita a promessa com o erro original
    }
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
            onChange={(event) =>
              setData({ ...data, plantId: event.target.value })
            }
          />
          <Loader isLoading={isLoading} />
          <DragAndDrop file={file} onChangeFile={setFile} />

          {data.plantId && file ? (
            <Button name="Classificar" />
          ) : (
            <Button name="Classificar" disabled={true} />
          )}
          <ResultClassificationPopUp
            isOpen={isOpen}
            resultImage={image}
            results={parseStringToObjects(data.classificationData)}
            onCloseModal={onCloseModal}
          />
        </form>
        <Button
          name="Visualizar histórico"
          onClick={() => navigate("/classifications")}
        />
        {/* <Card
          ipfsLink="https://yellow-innovative-dolphin-583.mypinata.cloud/ipfs/QmP87GWY1X2c1ZSTbF2x19wSNHferFXc97wPmi6NyQrziv"
          plantId={1}
          classifications={[
            {
              className: "Phoma",
              distribution: "100%",
            },
            {
              className: "Phoma",
              distribution: "100%",
            },
            {
              className: "Phoma",
              distribution: "100%",
            },
          ]}
          date={"18/08/2002 23:45"}
        /> */}
      </main>
    </article>
  );
}
