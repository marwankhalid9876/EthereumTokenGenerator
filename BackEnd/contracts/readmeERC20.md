//C is for (call) functions





constructor(string memory name, string symbol, uint256 initialSupply, bool list)
if “list” is true the whitelist will be used

addtoWlist (address add)
adds “add” to whitelist.

allowance(address owner, address spender) → uint256   C
Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom. This is zero by default.

approve (address to, uint256 amount) returns bool
Sets amount as the allowance of spender over the caller’s tokens.

increaseAllowance(address spender, uint256 addedValue) returns bool
Atomically increases the allowance granted to spender by the caller.

decreaseAllowance(address spender, uint256 substractedValue) returns bool
Atomically decreases the allowance granted to spender by the caller.

removefromWlist (address add)
removes “add” from whitelist.

transfer(address recipient, uint256 amount)  returns (bool)
when value tokens are moved from one account (msg.sender) to another (recipient).

transferFrom(address sender, address recipient, uint256 amount)  returns (bool)
when value tokens are moved from one account (sender) to another (recipient).


balanceOf(address owner)  returns uint256 C
Gets the balance of the specified address.


inWlist(address add) returns bool  C
checks if add is in whitelist

totalSupply()  returns uint256           C
Returns the amount of tokens in existence.
