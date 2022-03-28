import React, { useState } from "react";
import { connect } from "react-redux";

const ProfilePage = (props) => {
    console.log('=====', props)
    return (
        <div>
            <h1>Testing Profile Page</h1>
            <h1>Testing Profile Page</h1>
            <h1>Testing Profile Page</h1>
            <h1>Testing Profile Page</h1>
            <h1>Testing Profile Page</h1>
            <h1>Testing Profile Page</h1>
        </div>
    )
}

const mapState = (state) => {
    return {
        auth: state.auth,
        //fetch user info...
    };
};

const mapDispatch = (dispatch) => {
    return {

    };
};

export default connect(mapState, mapDispatch)(ProfilePage);