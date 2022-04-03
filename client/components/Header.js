import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Typography, Grid } from "@mui/material";

function Header(props) {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ padding: "15px", marginBottom: "30px" }}>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ color: "white", fontFamily: "Roboto Condensed" }}
        >
          Support your scientists
          <span className="main-title-span"> directly</span> <br /> through
          <span className="main-title-blue"> De</span>
          <span className="main-title-span">Sci </span>
          <span className="main-title-blue">Funder</span>
        </Typography>
        <Typography
          marginTop="25px"
          color="primary.light"
          variant="h5"
          textAlign="center"
          sx={{ fontFamily: "Roboto Condensed" }}
        >
          Decentralized • Transparent • Immutable
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Link to={props.auth.id ? "/projects" : "/signup"}>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 4, mb: 2, color: "#051f2e" }}
          >
            Start Here
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState, null)(Header);
