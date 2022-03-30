import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../../store";
import {
  Box,
  TextField,
  Button,
  Alert,
  Container,
  CssBaseline,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, authenticate, error } = props;
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    navigate("/projects");
    authenticate(username, password, formName);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <Grid item xs={12} sx={{ margin: "10px" }}></Grid>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
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
            <Typography
              color="secondary"
              component="h1"
              variant="h5"
              marginBottom="20px"
            >
              {displayName}
            </Typography>
            <TextField
              required
              id="username"
              label="Username"
              fullWidth
            ></TextField>
            <TextField
              fullWidth
              required
              type="password"
              id="password"
              label="Password"
            ></TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "300px" }}
            >
              {displayName}
            </Button>
            <Link to={"/signup"}>
                <Typography padding={3}>Don't have an account? Sign up here!</Typography>
              </Link>
            {error && error.response && (
              <Alert severity="error"> {error.response.data} </Alert>
            )}
          </Box>
        </Box>
      </Container>
      <Grid item xs={12} sx={{ margin: "7%" }}></Grid>
    </Grid>
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
    authenticate: (username, password, formName) =>
      dispatch(authenticate(username, password, formName)),
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
