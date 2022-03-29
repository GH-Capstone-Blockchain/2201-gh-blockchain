import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Routes, Switch } from "react-router-dom";
import { Login } from "./components/authForms/Login";
import { Signup } from "./components/authForms/SignUp";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import SingleProject from "./components/SingleProject";
import AllProjects from "./components/AllProjects2";
import AddProjectForm from "./components/AddProjectForm";
import ScientistsDropDown from "./components/smallComponents/ScientistsDropDown";
import TestingPage from "./components/Testing";
import ProjectDashboard from "./components/ProjectDashboard";
import ProfilePage from "./components/userProfile/ProfilePage";
import AboutPage from "./components/AboutPage";

import { me } from "./store";

//blockchain
import Web3 from "web3";

import { loadWeb3, loadAccount } from "./store/interactions";

/**
 * COMPONENT
 */
class Routers extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     account: "",
  //   };
  // }

  componentDidMount() {
    this.props.loadInitialData();
  }

  // async componentWillMount() {
  //   await this.loadWeb3();
  //   await this.loadBlockchainData();
  // }

  //load web3:
  // async loadBlockchainData(dispatch) {
  //   const web3 = await loadWeb3(dispatch);
  //   await loadAccount(web3, dispatch);
  //   const accounts = await web3.eth.getAccounts();
  //   console.log(accounts);
  // }

  // async loadWeb3() {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     window.alert(
  //       "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //     );
  //   }
  // }

  // async loadBlockchainData() {
  //   const web3 = window.web3;
  //   const accounts = await web3.eth.getAccounts();
  //   this.setState({ account: accounts[0] });
  // }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="projects" element={<AllProjects />} />
            <Route path="projects/:id" element={<SingleProject />} />
            <Route path="addproject" element={<AddProjectForm />} />
            <Route path="dropdown" element={<ScientistsDropDown />} />
            <Route path="test" element={<TestingPage />} />
            <Route path="user/:id" element={<ProfilePage />} />
            <Route path="dashboard/:id" element={<ProjectDashboard />} />
            {/* <Route path="/loggedin" element={<Home />} /> */}
          </Routes>
        ) : (
          <Routes>
            {/* <Route path="/notloggedin" element={<Login />} /> */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="projects" element={<AllProjects />} />
            <Route path="projects/:id" element={<SingleProject />} />
            <Route path="addproject" element={<AddProjectForm />} />
            <Route path="login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="dropdown" element={<ScientistsDropDown />} />
            <Route path="/user/:id" element={<ProfilePage />} />
            <Route path="test" element={<TestingPage />} />
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
