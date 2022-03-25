import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Box, TextField, Button, Alert, Container } from "@mui/material";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <Box
      className="form"
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      name={name}
    >
      <div className="form">
        <TextField required id="username" label="Username"></TextField>
        <TextField required id="password" label="Password"></TextField>
      </div>
      <div className="login-signup-button">
        <Button type="submit">{displayName}</Button>
      </div>
      {error && error.response && (
        <Alert severity="error"> {error.response.data} </Alert>
      )}
    </Box>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
