pragma solidity <=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameItem is ERC721URIStorage { using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

bool _list;

 address[]  private wlist;
     address admin;
     mapping(address => uint256[]) private balances; 
     
    constructor(string memory name,
        string memory symbol, bool list,address[] memory w) ERC721(name, symbol) public {
            admin=msg.sender;
            _list=list;
            wlist=w;
    }

    function awardItem(address player, string memory tokenURI) public returns (uint256) {
    
    require(msg.sender==admin);
    require(inWlist(player));
    _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
       balances[player].push(newItemId);
        _safeMint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
    
    function transferFrom (address from, address to, uint256 tokenId)public override
    {
        require(inWlist(to));
        safeTransferFrom(from, to, tokenId);
        
    }

 function transferFrom(address from, address to, uint256 tokenId,bytes  memory _data)public {
    require(inWlist(to));
        safeTransferFrom(from, to, tokenId,_data);
}
    
   
    
    function inWlist(address add) public  view returns(bool){
        if(!_list)
        return true;
         for (uint i = 0; i<wlist.length; i++){
           if(wlist[i]==add){
               
               
          
          return true;
               
           }
   }
       return false;
   }
   
       function addtoWlist(address add)public{
        require(admin==msg.sender);
        wlist.push(add);
    }
  function removefromWlist(address add)public{
  require(admin==msg.sender);
       for (uint i = 0; i<wlist.length; i++){
           if(wlist[i]==add){
           delete wlist[i];
          return;}
        }
        
    }
    function ownedTokens (address add)public view returns ( uint256[] memory){
        return balances[add];
    }
}
