import React, { useState } from "react";
import { connect } from "react-redux";
import { authenticate, scientistSignUp } from "../../store/auth";
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
  Grid,
  Container,
  Avatar,
  CssBaseline,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";


/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, error, authenticate, scientistSignUp } = props;
  const navigate = useNavigate();

  //for radio option between supporter and scientist signup
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

  //sign up form functions
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

  const handleSubmit = (evt) => {
    if (signupType === "supporter") {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      navigate("/projects")
      authenticate(username, password, formName);
    } else if (signupType === "scientist") {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const type = "scientist";
      const publications = evt.target.publications.value;
      const credentials = evt.target.credentials.value;
      navigate("/projects")
      scientistSignUp(
        username,
        password,
        firstName,
        lastName,
        email,
        type,
        publications,
        credentials,
        formName
      );
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <Grid item xs={12} sx={{ margin: "10px" }}></Grid>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            className="form"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "300px" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            name={name}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography color="secondary" component="h1" variant="h5">
              {displayName}
            </Typography>
            {/* {scientist/supporter radio} */}
            <FormControl style={{ marginTop: 25 + "px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                I am a...
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="supporter"
                style={{ marginBottom: 10 + "px" }}
              >
                <FormControlLabel
                  value="supporter"
                  control={
                    <Radio {...controlProps("supporter")} size="small" />
                  }
                  label="Supporter"
                />
                <FormControlLabel
                  value="scientist"
                  control={
                    <Radio {...controlProps("scientist")} size="small" />
                  }
                  label="Scientist"
                />
              </RadioGroup>
            </FormControl>
            {/* {supporter sign up form} */}
            {signupType === "supporter" ? (
              <div className="form">
                <TextField
                  required
                  id="username"
                  label="Username"
                  onChange={handleChange}
                ></TextField>
                <TextField
                  required
                  type="password"
                  id="password"
                  label="Password"
                  onChange={handleChange}
                ></TextField>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "300px" }}
                >
                  {displayName}
                </Button>
              </div>
            ) : null}

            {/* {scientist sign up form} */}
            {signupType === "scientist" ? (
              <div className="form">
                <TextField
                  required
                  id="username"
                  label="Username"
                  onChange={handleChange}
                ></TextField>
                <TextField
                  required
                  type="password"
                  id="password"
                  label="Password"
                  onChange={handleChange}
                ></TextField>
                <TextField
                  required
                  id="firstName"
                  label="First Name"
                  onChange={handleChange}
                ></TextField>
                <TextField
                  required
                  id="lastName"
                  label="Last Name"
                  onChange={handleChange}
                ></TextField>
                <TextField
                  required
                  id="email"
                  label="Email"
                  onChange={handleChange}
                ></TextField>
                <TextField
                  required
                  id="publications"
                  label="Publications"
                  multiline
                  rows={4}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  required
                  id="credentials"
                  label="Credentials"
                  multiline
                  rows={4}
                  onChange={handleChange}
                ></TextField>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "300px" }}
                >
                  {displayName}
                </Button>
              </div>
            ) : null}

            {error && error.response && (
              <Alert severity="error"> {error.response.data} </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </Grid>
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
    authenticate: (username, password, method) =>
      dispatch(authenticate(username, password, method)),
    scientistSignUp: (
      username,
      password,
      firstName,
      lastName,
      email,
      type,
      publications,
      credentials,
      method
    ) =>
      dispatch(
        scientistSignUp(
          username,
          password,
          firstName,
          lastName,
          email,
          type,
          publications,
          credentials,
          method
        )
      ),
  };
};
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
