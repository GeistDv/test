// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Dancero is ERC1155, Ownable {
    constructor() ERC1155("https://raw.githubusercontent.com/GeistDv/pruebaNFT1155/main/{id}.json") {
        _mint(msg.sender, 1 , 10 , "");
        _mint(msg.sender, 2 , 20 , "");

        //1 m
        //2 h
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}
//0xa7B7cC621163e3ac45c379c50580bff36D1310C5