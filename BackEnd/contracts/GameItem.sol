pragma solidity <=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameItemNotUsed is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address[] private wlist;
    address admin;
    mapping(address => uint256[]) private balances;

    constructor(string memory name, string memory symbol)
        public
        ERC721(name, symbol)
    {
        admin = msg.sender;
    }

    function awardItem(address player, string memory tokenURI)
        public
        returns (uint256)
    {
        require(msg.sender == admin);
        require(inWlist(player));
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        balances[player].push(newItemId);
        _safeMint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function TransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        require(inWlist(to));
        safeTransferFrom(from, to, tokenId);
    }

    function TransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public {
        require(inWlist(to));
        safeTransferFrom(from, to, tokenId, _data);
    }

    function inWlist(address add) public view returns (bool) {
        for (uint256 i = 0; i < wlist.length; i++) {
            if (wlist[i] == add) {
                return true;
            }
        }
        return false;
    }

    function addtoWlist(address add) public {
        require(admin == msg.sender);
        wlist.push(add);
    }

    function removefromWlist(address add) public {
        for (uint256 i = 0; i < wlist.length; i++) {
            if (wlist[i] == add) {
                delete wlist[i];
                return;
            }
        }
    }

    function ownedTokens(address add) public view returns (uint256[] memory) {
        return balances[add];
    }
}
