// SPDX-License-Identifier: MIT 
pragma solidity >= 0.8.15;

contract LeafDataStorage {
    struct LeafData {
        string plantId;
        string ipfsLink;
        string classificationData;
        uint date;
    }

    // Mapeando os endereços dos usuários para seus respectivos dados submetidos
    mapping(address => LeafData[]) private userLeafData;

    // Definindo os atributos de userLeafData
    function setUserLeafData(string memory _plantId, string memory _ipfsLink, 
                             string memory _classificationData, uint _date) public {        
        LeafData memory newLeafData = LeafData({
            plantId: _plantId,
            ipfsLink: _ipfsLink,
            classificationData: _classificationData,
            date: _date
        });

        userLeafData[msg.sender].push(newLeafData);
    }

    // Retornando os dados salvos pelos respectivos usuários
    function getUserLeafDataFull() public view returns (LeafData[] memory) {
        return userLeafData[msg.sender];
    }
}