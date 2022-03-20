import Web3 from "web3";

import { web3Loaded, web3AccountLoaded } from "./actions";
// export const loadWeb3 = async (dispatch) => {
//   if (typeof window.ethereum !== "undefined") {
//     const web3 = new Web3(window.ethereum);
//     dispatch(web3Loaded(web3));
//     return web3;
//   } else {
//     window.alert("Please install MetaMask");
//     window.location.assign("https://metamask.io/");
//   }
// };

export const loadWeb3 = async (dispatch) => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    dispatch(web3Loaded(web3)); 
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider); 
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  dispatch(web3AccountLoaded(account));
  return account;
};
