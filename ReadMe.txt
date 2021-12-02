Little ReadMe:


Just a little self project to play around with some cool web3 technologies (Alchemy, Hardhat and Ether.js).
I wanted to see if I could make a DAPP that would return a specific transaction when searched for. 
As this application is only for testing, it is hosted on the Ropsten network (rather than the Ethereum network).
You simply write in the oldest block you wish to search and the address you are searching for and, in the console,
there should be a reply with the transaction info. 

To setup this application. 
Firstly we require a metamask acc (on the Ropsten network with some eth). https://faucet.ropsten.be use this link
to add a small amount of eth into your new metamask account. We also require hardhat, node js & ether js to be 
installed. Once these are installed and configured, 'cd' into the containing folder and run the following commands.
'npx hardhat node' (take one of the hardhat accounts and push into your metamask (this account will require the
small amount of eth). From this metamask account, find its private key (account details -> export private key)
and overwrite the variable 'accounts' in hardhat.config.js. Now run 'npx hardhat run scripts/deploy.js --network
ropsten' (ensure you are in correct directory). Now open another terminal and go to the same directory and run
'npm start'. This should run everything you need to use the application. Enjoy :)