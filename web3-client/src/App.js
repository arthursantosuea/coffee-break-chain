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

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
    init();
  }, []);

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
  console.log(account, contract, account);
  return (
    <div className="App">
      <button onClick={testSendData}>Teste</button>
    </div>
  );
}

export default App;
