import React from "react";
import { Typography, Grid} from "@mui/material";
import { Fade } from "react-awesome-reveal";
import {
  AccountBalanceWallet,
  NoteAdd,
  VolunteerActivism,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const easySteps = [
  {
    icon: <AccountBalanceWallet sx={{ color: "#fff8cc", fontSize: 70 }} />,
    title: "Connect your wallet",
    detail:
      "DeSci Funder currently supports MetaMask, a crypto wallet extension for your browser.",
    color: "#ffef94",
    link: "https://metamask.io/",
    external: true,
  },
  {
    icon: <NoteAdd sx={{ color: "#ccfff3", fontSize: 70 }} />,
    title: "Create your campaign",
    detail: "As a scientist, you can easily create your campaign here.",
    color: "#94fdff",
    link: "/signup",
    external: false,
  },
  {
    icon: <VolunteerActivism sx={{ color: "#ffd9e3", fontSize: 70 }} />,
    title: "Support your favorite research",
    detail:
      "Whether you are a scientist or a regular supporter, you can make a donation to as many researches as you want without any minimum amount.",
    color: "#fcb3c1",
    link: "/projects",
    external: false,
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
            Take these <span className="main-title-blue">easy</span> steps
          </Typography>
        </Grid>
        {easySteps.map((reason) => {
          return (
            <Grid
              item
              xs={12}
              md={4}
              sx={{ padding: "10px" }}
              key={reason.title}
            >
              {!reason.external ? (
                <Link to={reason.link}>
                  {reason.icon}
                  <Typography
                    varient="h4"
                    color="white"
                    sx={{
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
                </Link>
              ) : (
                <a href={reason.link} target="_blank">
                  {reason.icon}
                  <Typography
                    varient="h4"
                    color="white"
                    sx={{
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
                </a>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Fade>
  );
}
