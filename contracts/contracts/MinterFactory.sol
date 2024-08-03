// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Minter.sol";

contract MinterFactory is Ownable {
    constructor() Ownable(msg.sender) {
        // initialize
    }

    function createMinter() public onlyOwner returns (address) {
        // return ERC721 contract address
    }
}
