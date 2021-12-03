//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "hardhat/console.sol";

contract SearchAddress {
    string private searchaddress;
	string private firstblock;
	string private lastblock;
	string private returnInfo;

    constructor(string memory _searchaddress) {
        console.log("Deploying a contract to searchaddress:", _searchaddress);
        searchaddress = _searchaddress;
    }

    function searchAddress() public view returns (string memory) {
        return searchaddress;
    } 
	
	function firstBlock() public view returns (string memory) {
        return firstblock;
    }
	
	function lastBlock() public view returns (string memory) {
        return lastblock;
    }

    function setSearchAddress(string memory _searchaddress) public {
        console.log("Changing search address from '%s' to '%s'", searchaddress, _searchaddress);
		returnInfo = _searchaddress;
        searchaddress = _searchaddress;
    }
	
	function setFirstBlock(string memory _firstblock) public {
        console.log("Changing first block from '%s' to '%s'", firstblock, _firstblock);
        firstblock = _firstblock;
    }
	
	function setLastBlock(string memory _lastblock) public {
        console.log("Changing last block from '%s' to '%s'", lastblock, _lastblock);
        lastblock = _lastblock;
    }
	
	function getAccountTransactions(string memory searchaddress, int startBlockNumber, int endBlockNumber) public returns (string memory) {

		uint i = startBlockNumber;
		for (; i <= endBlockNumber; i++) {
			Block storage block = eth.getBlock(i, true);
			
			for( unit j = 0; j < block.transactions.Count(); j++){
				if(block.transactions[j].from == searchAddress 
				||
				block.transactions[j].to == searchAddress )
				{
					returnInfo = "tx hash : " + e.hash + "\n" +
					"nonce : " + e.nonce + "\n" +
					"blockHash : " + e.blockHash + "\n"
					"blockNumber : " + e.blockNumber + "\n"
					"transactionIndex : " + e.transactionIndex + "\n"
					"from : " + e.from + "\n" 
					"to : " + e.to + "\n"
					"value : " + e.value + "\n"
					"gasPrice : " + e.gasPrice + "\n"
					"gas : " + e.gas + "\n"
					"input : " + e.input;
					break;
				}
			}
			
			/**block.transactions.forEach( function(e) {
				if (searchaddress == e.from || searchaddress == e.to) {
					returnInfo = "tx hash : " + e.hash + "\n" +
					"nonce : " + e.nonce + "\n" +
					"blockHash : " + e.blockHash + "\n"
					"blockNumber : " + e.blockNumber + "\n"
					"transactionIndex : " + e.transactionIndex + "\n"
					"from : " + e.from + "\n" 
					"to : " + e.to + "\n"
					"value : " + e.value + "\n"
					"gasPrice : " + e.gasPrice + "\n"
					"gas : " + e.gas + "\n"
					"input : " + e.input;
					break;
				}
			})*/
			
			
		}
		return returnInfo;
	}
}
