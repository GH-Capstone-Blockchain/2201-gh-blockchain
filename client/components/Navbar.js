import React, { useState, useEffect } from "react";
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
  Drawer,
  MenuItem,
} from "@mui/material";

import { Menu } from "@mui/icons-material";

// const links = [
//   {
//     label: "Projects",
//     link: "/addproject",
//     always: true,
//   },
//   {
//     label: "Start A Project",
//     link: "/addproject",
//     always: false,
//     isLoggedIn: true,
//     isScientist: true,
//   },
//   {
//     label: "Dashboard",
//     link: `/dashboard/${auth.id}`,
//     always: false,
//     isLoggedIn: true,
//     isScientist: true,
//   },
//   {
//     label: "My Profile",
//     link: `/user/${auth.id}`,
//     always: false,
//     isLoggedIn: true,
//   },
//   {
//     label: "Logout",
//     link: `/user/${auth.id}`,
//     always: false,
//     isLoggedIn: true,
//   },
// ];

const Navbar = ({ handleClick, isLoggedIn, auth, profileImg }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space between",
          alignItems: "flex-end",
        }}
      >
        <Grid item xs={3}>
          {Logo}
        </Grid>
        <Grid item xs={9}>
          {getMenuButtons()}
        </Grid>
      </Grid>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space between",
          alignItems: "flex-end",
        }}
      >
        <Grid item={3}>{Logo}</Grid>
        <Grid item={9} sx={{ position: "absolute", right: "0px" }}>
          <Toolbar>
            <IconButton onClick={handleDrawerOpen}>
              <Menu color="primary" />
            </IconButton>

            <Drawer
              {...{
                anchor: "right",
                open: drawerOpen,
                onClose: handleDrawerClose,
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  flexDirection: "column",
                }}
              >
                {isLoggedIn ? (
                  <div>
                    <Grid item>
                      <Link to="/projects">
                        <Button>All Projects</Button>
                      </Link>
                    </Grid>

                    {auth.scientist ? (
                      <>
                        <Grid item>
                          <Link to="/addproject">
                            <Button>Start A Project</Button>
                          </Link>
                        </Grid>
                      </>
                    ) : null}
                    <Grid item>
                      <Link to={`/user/${auth.id}`}>
                        <Button>My Profile</Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <a href="/login" onClick={handleClick}>
                        <Button>Logout</Button>
                      </a>
                    </Grid>

                    <Grid item>
                      <Tooltip title="My Profile">
                        <Link to={`/user/${auth.id}`}>
                          <IconButton onClick={handleOpenUserMenu}>
                            <Avatar
                              alt="Remy Sharp"
                              src={profileImg}
                              sx={{ width: 60, height: 60 }}
                            />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </Grid>
                  </div>
                ) : (
                  <div>
                    <Grid item>
                      <Link to="/projects">
                        <Button>All Projects</Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/login">
                        <Button>Login</Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/signup">
                        <Button>Sign Up</Button>
                      </Link>
                    </Grid>
                  </div>
                )}
              </Grid>
            </Drawer>
          </Toolbar>
        </Grid>
      </Grid>
    );
  };

  const Logo = (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "250px",
      }}
    >
      <Grid item xs={3} sx={{ minWidth: "60px" }}>
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
            sx={{
              fontFamily: "Roboto Condensed",
              marginBottom: "4px",
            }}
          >
            De
            <span className="main-title-span">Sci </span>Funder
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );

  const getMenuButtons = () => {
    return (
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        {/* <Grid item xs = {10} */}
        {isLoggedIn ? (
          <Grid item>
            <Link to="/projects">
              <Button to="/projects">All Projects</Button>
            </Link>
            {auth.scientist ? (
              <>
                <Link to="/addproject">
                  <Button>Start A Project</Button>
                </Link>
              </>
            ) : null}
            <Link to={`/user/${auth.id}`}>
              <Button>My Profile</Button>
            </Link>
            <a href="/login" onClick={handleClick}>
              <Button>Logout</Button>
            </a>
            <Tooltip title="My Profile">
              <Link to={`/user/${auth.id}`}>
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar
                    alt="Remy Sharp"
                    src={profileImg}
                    sx={{ width: 60, height: 60 }}
                  />
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>
        ) : (
          <Grid item>
            {/* The navbar will show these links before you log in */}

            {/* <Link to="/about">
        <Button>About</Button>
      </Link> */}
            <Link to="/projects">
              <Button>All Projects</Button>
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </Grid>
        )}
      </Grid>
    );
  };
  return (
    <header>
      <AppBar position="fixed" elevation={0} style={{ background: "#051f2e" }}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
    profileImg: state.auth.profileImg,
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
