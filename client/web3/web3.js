import Web3 from 'web3';
import Campaign from '../../build/contracts/Campaign.json'

//this will initialize a web3 instance with the metamask provider that Metamask injects on the browser
//"window" variable cannot be accessed using Next.js since Next does server side rendering and
//Node JS server has nothing known as "window". window is only available in the browser

let web3;
let currentAccount = null;

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // Do any other work!
  }
}

// check if it is browser and if the browser has Metamask installed
export async function loadWeb3() {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const address = await window.ethereum
      .request({ method: 'eth_requestAccounts' })
      return address
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  } catch (error) {
    console.log(error)
  }

}


export async function loadContractData(contractAddress) {
  const web3 = window.web3;
  try {
    const campaign = await new web3.eth.Contract(Campaign.abi, contractAddress); //create JS version of Escrow smart contract
    console.log(campaign)
    return campaign
  } catch (error) {
    console.log(error)
  }
}