import React from "react";
import Escrow from "../../build/contracts/Escrow.json";

//blockchain
import Web3 from "web3";

export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      account: "",
      escrow: null,
      totalDonation: 0,
    };
  }

  async componentWillMount() {
    // this.loadBlockchainData(this.props.dispatch);
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
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
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = Escrow.networks[networkId];
    if (networkData) {
      const escrow = new web3.eth.Contract(Escrow.abi, networkData.address); //create JS version of Escrow smart contract
      this.setState({ escrow });
      const totalDonation = await escrow.methods.currentTotalDonation().call();
      this.setState({ totalDonation });
    } else {
      window.alert("Escrow contract is not deployed to detected network.");
    }
  }
  render() {
    return (
      <div>
        You can send money here!
        <div> account address: {this.state.account}</div>
        <div> total donation: {this.state.totalDonation}</div>
      </div>
    );
  }
}
