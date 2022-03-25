import React, { useState } from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import {
  Box,
  TextField,
  Button,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from "@mui/material";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  const [signupType, setSignupType] = useState({
    type: "",
  });

  const handleSignupType = (event) => {
    setSignupType(event.target.value);
  };

  const controlProps = (item) => ({
    checked: signupType === item,
    onChange: handleSignupType,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (event) => {
    let value = event.target.value;
    setForm({ ...form, [event.target.id]: value });
  };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // props.createProject(form)
//   };

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
      {/* {scientist/supporter option} */}
      <FormControl style={{marginTop: 25 + "px"}}>
        <FormLabel id="demo-row-radio-buttons-group-label">I am a...</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue="supporter"
          style={{marginBottom: 10 + "px"}}
        >
          <FormControlLabel
            value="supporter"
            control={<Radio {...controlProps("supporter")} size="small" />}
            label="Supporter"
          />
          <FormControlLabel
            value="scientist"
            control={<Radio {...controlProps("scientist")} size="small" />}
            label="Scientist"
          />
        </RadioGroup>
      </FormControl>

      {/* {supporter sign up form} */}
      {signupType === "supporter" ? (
        <div className="form">
          <TextField required id="username" label="Username" onChange={handleChange}></TextField>
          <TextField required id="password" label="Password" onChange={handleChange}></TextField>
          <div className="login-signup-button">
            <Button type="submit">{displayName}</Button>
          </div>
        </div>
      ) : null}

      {/* {scientist sign up form} */
      console.log(form)}
      {signupType === "scientist" ? (
        <div className="form">
          <TextField required id="username" label="Username" onChange={handleChange}></TextField>
          <TextField required id="password" label="Password" onChange={handleChange}></TextField>
          <TextField required id="firstName" label="First Name" onChange={handleChange}></TextField>
          <TextField required id="lastName" label="Last Name" onChange={handleChange}></TextField>
          <TextField required id="email" label="Email" onChange={handleChange}></TextField>
          <div className="login-signup-button">
            <Button type="submit">{displayName}</Button>
          </div>
        </div>
      ) : null}

      {error && error.response && (
        <Alert severity="error"> {error.response.data} </Alert>
      )}
    </Box>
  );
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
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
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
