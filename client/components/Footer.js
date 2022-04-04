import React from "react";
import { Typography, Grid, Box } from "@mui/material";

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
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Grid item xs={4} md={5.5} textAlign="right">
        <Box
          component="img"
          alt="DeSci Funder"
          src="/logo.png"
          height="30px"
          marginRight="5px"
        />
      </Grid>
      <Grid item xs={8} md={6.5} textAlign="left">
        <Typography color="primary" marginLeft="5px">
          {" "}
          © 2022 De<span className="main-title-span">Sci </span> Funder{" "}
        </Typography>
      </Grid>
    </Grid>
  );
}
