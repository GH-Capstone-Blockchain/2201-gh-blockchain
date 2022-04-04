import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Routes,Navigate} from "react-router-dom";
import { Login } from "./components/authForms/Login";
import { Signup } from "./components/authForms/SignUp";
import LandingPage from "./components/LandingPage";
import SingleProject from "./components/SingleProject";
import AllProjects from "./components/AllProjects2";
import AddProjectForm from "./components/AddProjectForm";
import ScientistsDropDown from "./components/smallComponents/ScientistsDropDown";
import ProjectDashboard from "./components/ProjectDashboard";
import ProfilePage from "./components/userProfile/ProfilePage";
import { PageNotFound } from "./components/AccessForbiddenPage";
import { me } from "./store";

class Routers extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          <Route path="projects" element={<AllProjects />} />
          <Route path="projects/:id" element={<SingleProject />} />
          <Route path="dropdown" element={<ScientistsDropDown />} />
          <Route path="user/:id" element={<ProfilePage />} />
          <Route path="dashboard/:id" element={<ProjectDashboard />} />
          
        </Routes>
        {isLoggedIn ? (
          <Routes>
            <Route path="addproject" element={<AddProjectForm />} />
            <Route path="login" element={<Navigate replace to="/projects" />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
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

export default connect(mapState, mapDispatch)(Routers);
