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
  console.log(leafData);
  try {
    const response = await contract.methods
      .setUserLeafData(
        leafData.plantId,
        leafData.ipfsLink,
        leafData.classificationData,
        leafData.date
      )
      .send({
        from: addressAccount,
        gas: 1000000,
        gasPrice: 10000000000,
      });

    console.log(response);
  } catch (error) {
    console.error(error);
    throw error; // Rejete a promessa para que o erro seja propagado
  }
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
