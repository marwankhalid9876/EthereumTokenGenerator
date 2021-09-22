pragma solidity <=0.8.0;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 * Based on https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.1/contracts/examples/SimpleToken.sol
 */

contract SimpleToken is ERC20 {
    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */

    //uint256 _totalSupply;
    address[] private wlist;
    bool _list;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        bool list
    ) public ERC20(name, symbol) {
        addtoWlist(msg.sender);
        _mint(msg.sender, initialSupply);
        _list=list;
    }

    function usertransferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual payable returns (bool) {
        if (inWlist(recipient)) {
            _transfer(sender, recipient, amount);
            return true;
        }

        return false;
    }

    function inWlist(address add) public view returns (bool) {
            if(!_list){
        return true;}
        for (uint256 i = 0; i < wlist.length; i++) {
            if (wlist[i] == add) {
                return true;
            }
        }
    }
    
    
     function userapprove(address spender, uint256 amount) public payable{
       approve( spender,  amount);
   }

    function usertransferTo(address recipient, uint256 amount)
        public
        virtual
        payable
        returns (bool)
    {
        if (inWlist(recipient)) {
            _transfer(msg.sender, recipient, amount);
            return true;
        }

        return false;
    }

    function addtoWlist(address add) public  {
        wlist.push(add);
    }


    function removefromWlist(address add) public  {
        for (uint256 i = 0; i < wlist.length; i++) {
            if (wlist[i] == add) {
                delete wlist[i];
                
            }
        }
    }
}
