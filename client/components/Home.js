import React from "react";
import { connect } from "react-redux";

/**
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  if (username) {
    return (
      <div>
        <p>Welcome, {username}!</p>
      </div>
    );
  } else {
    return <p>Welcome, Guest!</p>;
  }
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
