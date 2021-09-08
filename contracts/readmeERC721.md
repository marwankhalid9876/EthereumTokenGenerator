constructor(string memory name, string symbol, bool list)
if “list” is true the whitelist will be used

addtoWlist (address add)
adds “add” to whitelist.

approve (address to, uint256 tokenId)
Approves another address to transfer the given token ID The zero address indicates there is no approved address. There can only be one approved address per token at a given time. Can only be called by the token owner or an approved operator.

awardItem(address player, string tokenURI) returns uint256 (id of the new token)
mints a new token and awards it to “player”

removefromWlist (address add)
removes “add” from whitelist.

transferFrom(address from, address to, uint256 tokenId)
Transfers the ownership of a given token ID to another address. Usage of this method is discouraged, use safeTransferFrom whenever possible. Requires the msg.sender to be the owner, approved, or operator.

transferFrom(address from, address to, uint256 tokenId, bytes _data)
Safely transfers the ownership of a given token ID to another address .Requires the msg.sender to be the owner, approved, or operator, _data can be added to the transaction 

setApprovalForAll (address to, bool approved)
Sets or unsets the approval of a given operator An operator is allowed to transfer all tokens of the sender on their behalf.

balanceOf(address owner)  returns uint256
Gets the balance of the specified address.

ownerOf(uint256 tokenId)   returns address
Gets the owner of the specified token ID.

inWlist(address add) returns bool
checks if add is in whitelist

isApprovedForAll(address owner, address operator) returns bool
Tells whether an operator is approved by a given owner.

ownedTokens (address add) returns unit256[]
returns the owned tokens of “add”

tokenURI(uint256 tokenId) returns string
Returns the URI for a given token ID. May return an empty string.


