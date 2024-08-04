// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Minter.sol";

contract MinterFactory is Ownable {
    mapping(uint256 companyId => address) private _contracts;
    mapping(uint256 companyId => address[]) private _oldContracts;

    event NewMinterContract(
        uint256 indexed companyId,
        address indexed contractAddress
    );
    event ForgetMinterContract(
        uint256 indexed companyId,
        address indexed contractAddress
    );

    error CompanyIdAlreadyExists();
    error NonExistMinterContract();

    /* --------------------------- */

    constructor() Ownable(msg.sender) {}

    /* --------------------------- */

    function createMinter(
        uint256 companyId,
        string memory companyName
    ) public onlyOwner returns (address) {
        if (_contracts[companyId] != address(0)) {
            revert CompanyIdAlreadyExists();
        }
        Minter minter = new Minter(owner(), companyId, companyName);
        address minterAddress = address(minter);

        _contracts[companyId] = minterAddress;

        emit NewMinterContract(companyId, minterAddress);

        return minterAddress;
    }

    function getContractAddress(
        uint256 companyId
    ) public view onlyOwner returns (address) {
        return _contracts[companyId];
    }

    /* --------------------------- */

    function forgetContractAddress(
        uint256 companyId
    ) public onlyOwner returns (address) {
        address minterAddress = _contracts[companyId];

        if (minterAddress == address(0)) {
            revert NonExistMinterContract();
        } else {
            _oldContracts[companyId].push(minterAddress);
            delete _contracts[companyId];

            emit ForgetMinterContract(companyId, minterAddress);
        }

        return minterAddress;
    }

    function getOldContractAddress(
        uint256 companyId
    ) public view onlyOwner returns (address[] memory) {
        return _oldContracts[companyId];
    }
}
