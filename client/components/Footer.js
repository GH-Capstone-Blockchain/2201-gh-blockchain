import React, { useState } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";

export default function Footer() {
  return (
    <Grid
      className={"footer"}
      container
      sx={{
        position: "fixed",
        left: "0",
        bottom: "0",
        backgroundColor: "#051f2e",
        padding: "15px",
        // opacity: "0.8",
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Grid item xs={6} textAlign="right">
        <Box component="img" alt="DeSci Funder" src="/logo.png" height="30px" />
      </Grid>
      <Grid item xs={6} textAlign="left">
        <Typography sx={{ color: "white" }}> © 2022 DeSci Funder </Typography>
      </Grid>
    </Grid>
  );
}
