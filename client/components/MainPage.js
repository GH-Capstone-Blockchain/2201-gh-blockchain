import React from "react";

//blockchain
import Web3 from "web3";

export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      account: "",
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
  }
  render() {
    return (
      <div>
        You can send money here!
        <div> {this.state.account}</div>
      </div>
    );
  }
}
