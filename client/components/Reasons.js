import React from "react";
import { Button, Typography, Grid, Box } from "@mui/material";

const reasons = [
    
]


export default function Reasons() {
  return (
    <Grid container textAlign="center">
      <Grid item xs={12}>
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontFamily: "Roboto Condensed",
            marginTop: "20%",
            marginBottom: "5%",
          }}
        >
          {" "}
          No more platform fees
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography
          varient="h4"
          sx={{
            color: "white",
            fontFamily: "Roboto Condensed",
          }}
        >
          Decentralized
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography varient="h5">Transparent</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography varient="h5">Immutable</Typography>
      </Grid>
    </Grid>
  );
}
