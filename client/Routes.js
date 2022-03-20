import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Routes, Switch } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import MainPage from "./components/MainPage";

import { me } from "./store";

//blockchain
import Web3 from "web3";

import { loadWeb3, loadAccount } from "./store/interactions";

/**
 * COMPONENT
 */
class Routers extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  async componentWillMount() {
    // this.loadBlockchainData(this.props.dispatch);
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  //load web3:
  // async loadBlockchainData(dispatch) {
  //   // const web3 = await loadWeb3(dispatch);
  //   // const networkId = await web3.eth.net.getId();
  //   // await loadAccount(web3, dispatch);
  //   // const token = await loadToken(web3, networkId, dispatch);
  //   // if (!token) {
  //   //   window.alert(
  //   //     "Token smart contract not detected on the current network. Please select another network with Metamask."
  //   //   );
  //   //   return;
  //   // }
  //   // const exchange = await loadExchange(web3, networkId, dispatch);
  //   // if (!exchange) {
  //   //   window.alert(
  //   //     "Exchange smart contract not detected on the current network. Please select another network with Metamask."
  //   //   );
  //   //   return;
  //   // }
  //   const web3 = await loadWeb3(dispatch);
  //   await loadAccount(web3, dispatch);
  //   const accounts = await web3.eth.getAccounts();
  //   console.log(accounts);
  // }

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
    console.log(accounts);
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>

        {isLoggedIn ? (
          <Routes>
            <Route path="/loggedin" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/notloggedin" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Routers);
