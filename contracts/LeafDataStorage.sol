// SPDX-License-Identifier: MIT 
pragma solidity >= 0.8.15;

contract LeafDataStorage {
    struct ClassDistribution {
        string className;
        uint256 distribution;
    }

    struct LeafData {
        string plantId;
        string ipfsLink;
        ClassDistribution[] classDistributions;
        uint date;
    }

    // Mapeando os endereços dos usuários para seus respectivos dados submetidos
    mapping(address => LeafData[]) private userLeafData;

    // Definindo os atributos de userLeafData
    function _setUserLeafData(string memory _plantId, string memory _ipfsLink, 
                              ClassDistribution[] memory _classDistributions, uint _date) private {
        userLeafData[msg.sender].push(LeafData({
            plantId: _plantId,
            ipfsLink: _ipfsLink,
            classDistributions: _classDistributions,
            date: _date
        }));
    }

    // Retornando os dados salvos pelos respectivos usuários
    function getUserLeafData(uint _index) public view returns(string memory, string memory, 
                                                              ClassDistribution[] memory, uint) {
        LeafData memory _userLeafData = userLeafData[msg.sender][_index];
        return (_userLeafData.plantId, _userLeafData.ipfsLink, 
                _userLeafData.classDistributions, _userLeafData.date);
    }

    // Retornando a quantidade total de submissões feita por um usuário
    function getLengthUserLeafData() public view returns(uint) {
        return userLeafData[msg.sender].length;
    }
}
