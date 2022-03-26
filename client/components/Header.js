import React, { useEffect, useState } from "react";
import { Button, Typography, Grid, Box } from "@mui/material";

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
          DeSci Funder
        </Typography>
        <Typography
          color="primary"
          variant="h5"
          textAlign="center"
          sx={{ fontFamily: "Roboto Condensed" }}
        >
          Decentralized • Transparent • Immutable
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button variant="contained" sx={{ mt: 4, mb: 2 }}>
          Start Here
        </Button>
      </Grid>
    </Grid>
  );
}
