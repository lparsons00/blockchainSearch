import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import SearchAddress from './artifacts/contracts/SearchAddress.sol/SearchAddress.json'
import React from "react";

// Update with the contract address logged out to the CLI when it was deployed 
//const SearchAddressContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

const SearchAddressContractAddress = "0x999CB54E01d25450292857f298c57269E7E54379";
function App() {
	const [address, setSearchAddressValue] = useState()
	const [firstblock, setFirstBlockValue] = useState()
	const [lastblock, setLastBlockValue] = useState()
	
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	
	const[searchAddressLocal, setsearchAddressLocal] = useState("")
	const handleFetchSearchAddress = () => setsearchAddressLocal(temp);
	
	const[searchBlockStart, setsearchBlockStartLocal] = useState("")
	const handleFetchFirstBlock = () => setsearchBlockStartLocal(temp);
	
	const[searchBlockLast, setsearchBlockLastLocal] = useState("")
	const handleFetchLastBlock = () => setsearchBlockLastLocal(temp);
	
	var temp = ""
	
	//var searchAddressLocal = ""
	var searchResultsLocal = ""
	//var searchBlockStart = ""
	//var searchBlockEnd = ""
	

    // request access to the user's MetaMask account
	async function requestAccount() {
		await window.ethereum.request({ method: 'eth_requestAccounts' });
	}

	
	async function fetchSearchAddress() {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const contract = new ethers.Contract(SearchAddressContractAddress, 
			SearchAddress.abi, provider)
		  
			try {
				const data = await contract.searchAddress()
				console.log('data: ', data)
				temp = data
				handleFetchSearchAddress();
				console.log('searchAddressLocal: ', searchAddressLocal);
			} catch (err) {
				console.log("Error: ", err)
			}
		}    
	}
	
	async function fetchFirstBlock() {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const contract = new ethers.Contract(SearchAddressContractAddress, 
			SearchAddress.abi, provider)
		  
			try {
				const data = await contract.firstBlock()
				console.log('data: ', data)
				temp = data
				handleFetchFirstBlock();
				console.log('searchBlockStart: ', searchBlockStart);
			} catch (err) {
				console.log("Error: ", err)
			}
		}    
	}
	
	async function fetchLastBlock() {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const contract = new ethers.Contract(SearchAddressContractAddress, 
			SearchAddress.abi, provider)
		  
			try {
				const data = await contract.lastBlock()
				console.log('data: ', data)
				temp = data
				handleFetchLastBlock();
				console.log('searchBlockLast: ', searchBlockLast);
			} catch (err) {
				console.log("Error: ", err)
			}
		}    
	}

	async function setSearchAddress() {
		if (!address) return
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount()
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner()
			const contract = new ethers.Contract(SearchAddressContractAddress, SearchAddress.abi, signer)
			const transaction = await contract.setSearchAddress(address)
			await transaction.wait()
			fetchSearchAddress()
		}
	}
	
	async function setFirstBlock() {
		if (!address) return
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount()
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner()
			const contract = new ethers.Contract(SearchAddressContractAddress, SearchAddress.abi, signer)
			const transaction = await contract.setFirstBlock(firstblock)
			await transaction.wait()
			fetchFirstBlock()
		}
	}
	
	async function setLastBlock() {
		if (!address) return
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount()
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner()
			const contract = new ethers.Contract(SearchAddressContractAddress, SearchAddress.abi, signer)
			const transaction = await contract.setLastBlock(lastblock)
			await transaction.wait()
			fetchLastBlock()
		}
	}
  
	
	
	//actually process the search
	async function processSearch() {
		if (!address) return
		if (typeof window.ethereum !== 'undefined') {
			//for now just hardcode blocks
			let startBlock = 11535833
			let endBlock = startBlock - 100
			await requestAccount()
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner()
			const contract = new ethers.Contract(SearchAddressContractAddress, SearchAddress.abi, signer)
			const transaction = await contract.getAccountTransactions(address, startBlock, endBlock)
			await transaction.wait()
			//fetchSearchAddress()
			
			try {
				const data = await contract.getAccountTransactions(address, startBlock, endBlock)
				console.log('data: ', data)
				
				
			} catch (err) {
				console.log("Error: ", err)
			}
			
		}
	}

	

	return (
		<div className="App">
			<header className="App-header">
				<button onClick={fetchSearchAddress}>Fetch Address Saved</button>
				<button onClick={setSearchAddress}>Set Search Address</button>
				<input onChange={e => setSearchAddressValue(e.target.value)} placeholder="Set search address" />
				
				<button onClick={fetchFirstBlock}>Fetch First Block</button>
				<button onClick={setFirstBlock}>Set First Block</button>
				<input onChange={e => setFirstBlockValue(e.target.value)} placeholder="Set first block" />
				
				<button onClick={fetchLastBlock}>Fetch Last Block</button>
				<button onClick={setLastBlock}>Set Last Block</button>
				<input onChange={e => setLastBlockValue(e.target.value)} placeholder="Set last block" />
				
				
				<div> Search Address: {searchAddressLocal} </div>
				<div> Search Block Start: {searchBlockStart} </div>
				<div> Search Block End: {searchBlockLast} </div>
				
				
				<button onClick={processSearch}>Process Search</button>
				
				
				
				<div> Search Results: {searchResultsLocal} </div>
			</header>
		</div>
	);
}

export default App;
