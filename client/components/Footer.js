import React, { useState } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";

export default function Footer() {
  return (
    <Grid
      container
      sx={{
        position: "static",
        left: "0",
        bottom: "0",
        backgroundColor: "#051f2e",
        height: "100px",
        opacity: "0.7",
      }}
    >
      <Grid item xs={12}>
        <Typography sx={{ color: "white" }}> © 2022 DeSci Funder </Typography>
      </Grid>
    </Grid>
  );
}
