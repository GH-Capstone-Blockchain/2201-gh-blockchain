import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

//style
import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Avatar,
  Tooltip,
  Typography,
  Grid,
} from "@mui/material";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <AppBar position="fixed" elevation={0} style={{ background: "#051f2e" }}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Grid item xs={3}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            <Grid item xs={3}>
              <Link to="/">
                <Box
                  component="img"
                  sx={{
                    height: "50px",
                    margin: "10px",
                    marginBottom: "4px",
                  }}
                  alt="DeSci Funder"
                  src="/logo.png"
                />
              </Link>
            </Grid>
            <Grid item xs={9}>
              <Link to="/">
                <Typography
                  color="primary"
                  variant="h5"
                  sx={{ fontFamily: "Roboto Condensed", marginBottom: "4px" }}
                >
                  De
                  <span className="main-title-span">Sci </span>Funder
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item xs = {10} */}
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}

            <Link to="/projects">
              <Button>All Projects</Button>
            </Link>
            {/* <Link to="/about">
              <Button>About</Button>
            </Link> */}
            <Link to="/addproject">
              <Button>Create Project</Button>
            </Link>
            <a href="#" onClick={handleClick}>
              <Button>Logout</Button>
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/projects">
              <Button>All Projects</Button>
            </Link>
            {/* <Link to="/about">
              <Button>About</Button>
            </Link> */}
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </Grid>
    </AppBar>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
