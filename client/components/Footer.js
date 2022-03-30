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
        padding: "30px",
        // opacity: "0.8",
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Grid item xs={12} textAlign="center">
        <Box component="img" alt="DeSci Funder" src="/logo.png" height="50px" />
        <Typography sx={{ color: "white" }}> © 2022 DeSci Funder </Typography>
      </Grid>
    </Grid>
  );
}
