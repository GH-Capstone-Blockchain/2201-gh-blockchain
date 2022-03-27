import React, { useEffect, useState } from "react";
import { Button, Typography, Grid, Box } from "@mui/material";

import { Fade } from "react-awesome-reveal";

export default function Header() {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ padding: "20px", marginBottom: "2%" }}>
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
          marginTop="30px"
          color="primary.light"
          variant="h5"
          textAlign="center"
          sx={{ fontFamily: "Roboto Condensed" }}
        >
          Decentralized • Transparent • Immutable
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button variant="contained" sx={{ mt: 4, mb: 2, color: "#051f2e" }}>
          Start Here
        </Button>
      </Grid>
    </Grid>
  );
}
