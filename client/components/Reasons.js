import React from "react";
import { Button, Typography, Grid, Box } from "@mui/material";

import {} from "@mui/icons-material";

const reasons1 = [
  {
    icon: "icon-decentralized.png",
    title: "Decentralized",
    detail:
      "DeSci Funder utilizes the blockchain technology, so there is no intermediary body between the supporters and scientists",
  },
  {
    icon: "icon-transparent.png",
    title: "Transparent",
    detail:
      "All transactions are available to the public thanks to Blockchain.",
  },
  {
    icon: "icon-immutable.png",
    title: "Immutable",
    detail:
      "Once transaction is accepted to blockchain, the data in the transaction cannot be altered.",
  },
];
const reasons2 = [
  {
    icon: "icon-noFees.png",
    title: "No Fees",
    detail:
      "Since there is no intermediary body involved, DeSci Funder takes zero fee.",
  },
  {
    icon: "icon-directConnect.png",
    title: "Directly Connected",
    detail:
      "Unlike the traditional scientific research funding system, supporters donations directly reach the scientist.",
  },
  {
    icon: "icon-awareness.png",
    title: "Increased Awareness",
    detail:
      "By directly connecting the scientists and the pulic, DeSci Funder increases the awareness of science and current social issues.",
  },
];

export default function Reasons() {
  return (
    <Grid
      container
      textAlign="center"
      sx={{
        backgroundColor: "rgba(5, 31, 46, 0.7)",
        borderRadius: "10px",
        marginTop: "15%",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontFamily: "Roboto Condensed",
            marginBottom: "5%",
          }}
        >
          {" "}
          No more platform fees
        </Typography>
      </Grid>
      {reasons1.map((reason) => {
        return (
          <Grid item xs={4} sx={{ padding: "10px" }} key={reason.title}>
            <img className="img-icon" src={reason.icon} />
            <Typography
              varient="h4"
              sx={{
                color: "white",
                fontFamily: "Roboto Condensed",
                fontSize: "1.5em",
              }}
            >
              {reason.title}
            </Typography>
            <Typography
              sx={{
                color: "#d8e2dc",
                fontWeight: "light",
                padding: "10px",
              }}
            >
              {reason.detail}
            </Typography>
          </Grid>
        );
      })}
      {reasons2.map((reason) => {
        return (
          <Grid
            item
            xs={4}
            sx={{ padding: "10px", marginTop: "10px" }}
            key={reason.title}
          >
            <img className="img-icon" src={reason.icon} />
            <Typography
              varient="h4"
              sx={{
                color: "white",
                fontFamily: "Roboto Condensed",
                fontSize: "1.5em",
              }}
            >
              {reason.title}
            </Typography>
            <Typography
              sx={{
                color: "#d8e2dc",
                fontWeight: "light",
                padding: "10px",
              }}
            >
              {reason.detail}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}
