import Web3 from 'web3';

//this will initialize a web3 instance with the metamask provider that Metamask injects on the browser
//"window" variable cannot be accessed using Next.js since Next does server side rendering and
//Node JS server has nothing known as "window". window is only available in the browser

let web3;

// check if it is browser and if the browser has Metamask installed
async function loadWeb3() {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
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



export default loadWeb3;