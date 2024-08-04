// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Minter is ERC721, ERC721URIStorage, Ownable {
    uint256 private _lastTokenId; // first is 1
    uint256 private _companyId;

    event NewNFT(uint256 indexed tokenId, string tokenURI);

    /* --------------------------- */

    constructor(
        address owner,
        uint256 companyId,
        string memory companyName
    ) ERC721(companyName, "Aper") Ownable(owner) {
        _companyId = companyId;
    }

    /* --------------------------- */

    function getCompanyId() public view onlyOwner returns (uint256) {
        return _companyId;
    }

    function getCompanyName() public view onlyOwner returns (string memory) {
        return name();
    }

    function getLastTokenId() public view onlyOwner returns (uint256) {
        return _lastTokenId;
    }

    function mint(string memory uri) public onlyOwner returns (uint256) {
        uint256 id = ++_lastTokenId;

        _safeMint(owner(), id);
        _setTokenURI(id, uri);

        emit NewNFT(id, uri);

        return id;
    }

    /* --------------------------- */

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
