import React from "react";
import { connect } from "react-redux";

const ProjectsList = (props) => {
  return <h1>Hi there! You've reached the ProjectsList</h1>;
};

const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(ProjectsList);