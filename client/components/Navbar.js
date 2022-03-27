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
} from "@mui/material";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" elevation={0} style={{ background: "#051f2e" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">
          <Box
            component="img"
            sx={{
              height: 64,
              flexGrow: 5,
              marginTop: "15%",
              marginBottom: "15%",
            }}
            alt="DeSci Funder"
            src="/logo.png"
          />
        </Link>
        <Link to="/">
          <Typography
            color="primary"
            variant="h5"
            sx={{ letterSpacing: 5, m: 1, fontWeight: "bold" }}
          >
            De
            <span className="main-title-span">Sci </span>Funder
          </Typography>
        </Link>

        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/projects">
              <Button>All Projects</Button>
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/projects">
              <Button>All Projects</Button>
            </Link>

            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  </Box>
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
