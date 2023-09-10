import logo from "./logo.svg";
import { useEffect, useState } from "react";
import {
  getAllLeafData,
  getContract,
  initWeb3Server,
  sendLeafData,
} from "./services/web3service";
import LeafDataStorage from "./build/contracts/LeafDataStorage.json";
import "./App.css";

function App() {
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
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
    window.ethereum.on('accountsChanged', function (newAccounts) {
      if (newAccounts.length === 0) {
          console.log('Nenhuma conta conectada no MetaMask.');
      } else {
          const newUserAccount = newAccounts[0];
          setAccount(newUserAccount);
          console.log('Conta do usuário alterada para:', newUserAccount);
      }
  });
  }, [account]);

  async function testSendData() {
    const dados = {
      plantId: "123", // Substitua pelo valor desejado (string)
      ipfsLink: "ipfs://example", // Substitua pela URI IPFS desejada (string)
      classNames: ["Class1", "Class2", "Class3"], // Substitua pelas classes desejadas (array de strings)
      distributions: [1, 1, 1], // Substitua pelas distribuições desejadas (array de números)
      date: 1631184000, // Substitua pela data desejada em formato UNIX timestamp (número)
    };
    sendLeafData(contract, dados, account);
  }

  async function testGetData() {
    const classifications = await getAllLeafData(contract, account);
    console.log(classifications);
  }

  console.log(account, contract, account);
  return (
    <div className="App">
      <button onClick={testSendData}>Envia</button>
      <button onClick={testGetData}>Retorna</button>
    </div>
  );
}

export default App;
