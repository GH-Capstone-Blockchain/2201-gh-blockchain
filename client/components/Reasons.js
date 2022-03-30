import React from "react";
import { Button, Typography, Grid, Box } from "@mui/material";
import { Fade } from "react-awesome-reveal";

const reasons1 = [
  {
    icon: "icon-decentralized.png",
    title: "Decentralized",
    detail:
      "DeSci Funder utilizes blockchain technology to create a trustless platform for crowdfunding scientific research — without third-party fees.",
  },
  {
    icon: "icon-transparent.png",
    title: "Transparent",
    detail:
      "All transactions are available to the public thanks to the Ethereum blockchain.",
  },
  {
    icon: "icon-immutable.png",
    title: "Immutable",
    detail:
      "Once a transaction is added to the Etherum blockchain, the data in the transaction cannot be altered.",
  },
];
const reasons2 = [
  {
    icon: "icon-noFees.png",
    title: "No Fees",
    detail:
      "Since there is no third-party involved, all funding raised on DeSci Funder goes directly to researchers.",
  },
  {
    icon: "icon-directConnect.png",
    title: "Directly Connected",
    detail:
      "Unlike the traditional scientific research funding system, supporters can directly contribute to research they care about.",
  },
  {
    icon: "icon-awareness.png",
    title: "Increased Awareness",
    detail:
      "By directly connecting scientists and the public, DeSci Funder increases awareness of cutting-edge scientific research and current social issues.",
  },
];

export default function Reasons() {
  return (
    <Fade down delay={200} duration={1000}>
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
            <span className="main-title-blue">No more </span>platform fees
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
    </Fade>
  );
}
