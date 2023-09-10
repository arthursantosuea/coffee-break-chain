import { Web3 } from "web3";

export function initWeb3Server() {
  const web3 = new Web3("http://127.0.0.1:8545");
  return web3;
}

export const getContract = async (web3, contractPath) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractPath.networks[networkId];

  const contract = new web3.eth.Contract(
    contractPath.abi,
    deployedNetwork.address
  );

  return contract;
};

export async function sendLeafData(contract, leafData, addressAccount) {
  await contract.methods
    .setUserLeafData(
      leafData.plantId,
      leafData.ipfsLink,
      leafData.classNames,
      leafData.distributions,
      leafData.date
    )
    .send({
      from: addressAccount,
      gas: 1000000,
      gasPrice: 10000000000,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getAllLeafData(contract, addressAccount) {
  const classifications = await contract.methods
    .getUserLeafDataFull()
    .call({ from: addressAccount })
    .then((response) => response)
    .catch((error) => {
      console.log(error.message);
      return error.message;
    });

    return classifications;
}

// const dados = {
//   plantId: "123", // Substitua pelo valor desejado (string)
//   ipfsLink: "ipfs://example", // Substitua pela URI IPFS desejada (string)
//   classNames: ["Class1", "Class2", "Class3"], // Substitua pelas classes desejadas (array de strings)
//   distributions: [1, 1, 1], // Substitua pelas distribuições desejadas (array de números)
//   date: 1631184000, // Substitua pela data desejada em formato UNIX timestamp (número)
// };

// const web3Server = initWeb3Server();

// const contract = await getContract(web3Server, LeafDataStorage);

// sendLeafData(contract, dados, "0x071aAF35D0a38F5856aEB8e4554399e493fB0645");
// const classifications = await getAllLeafData(
//   contract,
//   "0x071aAF35D0a38F5856aEB8e4554399e493fB0645"
// );

// console.log(classifications);


//   const plantId = "123"; // Substitua pelo valor desejado (string)
//   const ipfsLink = "ipfs://example"; // Substitua pela URI IPFS desejada (string)
//   const classNames = ["Class1", "Class2", "Class3"]; // Substitua pelas classes desejadas (array de strings)
//   const distributions = [1, 2, 2]; // Substitua pelas distribuições desejadas (array de números)
//   const date = 1631184000; // Substitua pela data desejada em formato UNIX timestamp (número)

//   // Agora você pode usar essas variáveis como parâmetros em seu código JavaScript.

//   const allClassifications = await contract.methods
//     .getUserLeafDataFull()
//     .call({from: "0x071aAF35D0a38F5856aEB8e4554399e493fB0645"})
//     .then((response) => console.log(response, "akjak"))
//     .catch((error) => {
//       console.log(error.message, "choremos");
//     });
//   console.log(allClassifications);

// initWeb3Server();

// import Web3 from "web3";

// export function initWeb3Server(): Web3 {
//   const web3 = new Web3("http://127.0.0.1:8545");
//   return web3;
// }

// export const getContract = async (
//   web3: Web3,
//   contractPath: { networks: { [key: string]: { address: string } }, abi: any }
// ) => {
//   const networkId = await web3.eth.net.getId();
//   const deployedNetwork = contractPath.networks[networkId];
//   console.log(deployedNetwork)

//   const contract = new web3.eth.Contract(
//     contractPath.abi,
//     deployedNetwork.address
//   );

//   return contract;
// };

// export async function sendLeafData(
//   contract: any,
//   leafData: {
//     plantId: string;
//     ipfsLink: string;
//     classNames: string[];
//     distributions: number[];
//     date: number;
//   },
//   addressAccount: string
// ) {
//   await contract.methods
//     .setUserLeafData(
//       leafData.plantId,
//       leafData.ipfsLink,
//       leafData.classNames,
//       leafData.distributions,
//       leafData.date
//     )
//     .send({
//       from: addressAccount,
//       gas: 1000000,
//       gasPrice: 10000000000,
//     })
//     .then((response: any) => {
//       console.log(response);
//     })
//     .catch((error: any) => {
//       console.log(error);
//     });
// }

// export async function getAllLeafData(contract: any, addressAccount: string) {
//   const classifications = await contract.methods
//     .getUserLeafDataFull()
//     .call({ from: addressAccount })
//     .then((response: any) => response)
//     .catch((error: any) => {
//       console.log(error.message);
//       return error.message;
//     });

//   return classifications;
// }