<p align="center"><img src="https://user-images.githubusercontent.com/94179519/161602751-d9fb1d52-15e8-4ae7-919e-bf46f2b18074.png"/></p>


## About
Raising money for scientific research is often a difficult and lengthy process that gives corporations, government entities, and non-profit foundations an outsized influence on what kind of research should be prioritized. As a regular person, there aren’t many opportunities (if any!) to directly fund scientists and their work. 

We created DeSci Funder with the goal of connecting people directly to the research they care about. Our web application is a decentralized crowdfunding platform for scientific research, built on the Ethereum blockchain. Unlike other crowdfunding platforms, you can support a cause of your choice without any third-party fees. 

## Technology Stack
The core of our application relies on the Ethereum blockchain.

Ethereum requires smart contracts to be deployed to the blockchain using a programming language called Solidity.
During our schema design phase, we carefully selected what would be stored on the blockchain since every interaction requires a small fee in ether and time to fetch the necessary data.

Our smart contract was responsible for storing information about the research projects, setting rules about making donations,
releasing funds, and returning funds in case of a canceled project.
We were able to create a seamless user experience by storing the rest of the data in our Postgres database. 

<p align="center"><img width="831" src="https://user-images.githubusercontent.com/94179519/161603784-5ca1a0ef-fb90-45f4-aba6-d6c5f5523205.png"/></p>


After writing our own smart contract in Solidity, we used the Truffle Suite as our Ethereum development environment
to deploy our smart contract to the Ropsten test network. Every time a new project is launched on DeSci Funder,
a new instance of our smart contract is deployed, which includes key information about the project and its scientists. 
We are simultaneously using Express to send additional data to our Postgres database to be rendered on the front end.
In order to do this, we used React, Redux, and the web3 library to connect the frontend of our application to our smart contract, enabling users to interact with the project in the blockchain through their MetaMask wallets. 

## What's Next?

When we started this project, we planned ahead for different phases.
We plan to implement the following: 
- A validation system for checking the credentials of scientists to insure all scientists are reputable scientists
- Including information about the institutions scientists are doing research under
- More search and filtering features such as by location, scientist, or institution


        


