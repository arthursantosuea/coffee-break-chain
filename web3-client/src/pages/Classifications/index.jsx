import { useEffect, useState } from "react";
import {
  getAllLeafData,
  getContract,
  initWeb3Server,
} from "../../services/web3service";

import LeafDataStorage from "../../build/contracts/LeafDataStorage.json";

import { parseStringToObjects } from "../../utils/formatStringToArray";
import { Card } from "../../components/Card";
import { useNavigate } from "react-router-dom";

import { SearchX } from "lucide-react";

export function Classifications() {
  const navigate = useNavigate();
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [classifications, setClassifications] = useState([]);
  useEffect(() => {
    async function init() {
      const web3 = initWeb3Server();
      const smartContract = await getContract(web3, LeafDataStorage);
      setContract(smartContract);
      console.log(smartContract, contract); 

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
      // await getClassifications();
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
      getClassifications();
    });
  }, [account]);

  const getClassifications = async () => {
    const getClassifications = await getAllLeafData(contract, account);
    setClassifications(getClassifications);
  };

  return (
    <div className="bg-primary-dark w-full min-h-screen items-center justify-center flex flex-col">
      {classifications.length == 0 ? (
        <p className="text-white flex flex-col items-center font-bold text-xl mb-20">
          <SearchX size={40} strokeWidth={1}/>
          Histórico vazio
        </p>
      ) : (
        <div className="flex gap-4 flex-wrap p-4 items-center justify-center">
          {classifications.map((classification) => (
            <Card
              plantId={classification.plantId}
              ipfsLink={classification.ipfsLink}
              date={classification.date}
              classifications={parseStringToObjects(
                classification.classificationData
              )}
            />
          ))}
        </div>
      )}
      {/* {classifications.length != 0 && ( */}
        <button
          onClick={getClassifications}
          className="w-48 h-10 bg-zinc-500 rounded-md text-white "
        >
          Buscar histórico
        </button>
      {/* )} */}
      <button
        onClick={() => navigate("/")}
        className="w-48 h-10 bg-red-500 rounded-md mt-4 text-white"
      >
        Nova classificação
      </button>
    </div>
  );
}
