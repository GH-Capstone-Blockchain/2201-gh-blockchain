import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Reasons from "./Reasons";

//style
import { Grid, Typography } from "@mui/material";

export default function About() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sx={{ margin: "5%" }} />
      <Grid item xs={1} />
      <Grid item xs={10} style={{ maxWidth: "1000px" }}>
          <Typography>Blockchain is a </Typography>
          <Typography>distributed ledger</Typography>
          <Typography>open to the public.</Typography>
      </Grid>
    </Grid>
  );
}
