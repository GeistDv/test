// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UstToken  is ERC20, Ownable {
    constructor() ERC20("Ust token", "UST") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
//0x67862E5fD5DdCDAC1007786d8ce4469dDa847635