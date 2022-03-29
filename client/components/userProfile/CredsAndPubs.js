import React from "react";
import { connect } from "react-redux";

const CredsAndPubs = (props) => {

  return (
    <div>
      <div>
        <h2>Credentials</h2>
        <p>{props.user.scientist.credentials}</p>
      </div>
      <div>
        <h2>Publications</h2>
        <p>{props.user.scientist.publications}</p>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(CredsAndPubs);
