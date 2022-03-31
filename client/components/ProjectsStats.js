import React, { useState } from "react";
import { Typography, Grid, IconButton } from "@mui/material";
import { animated, useSpring } from "react-spring";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function ProjectsStats() {
  const totalProjects = 454;
  const totalSupporters = 13523;
  const totalMoneyRaised = 7830392;

  const propsTotalProjs = useSpring({ val: totalProjects, from: { val: 0 } });
  const propsTotalSupporters = useSpring({
    val: totalSupporters,
    from: { val: 0 },
  });
  const propsTotalRaised = useSpring({
    val: totalMoneyRaised,
    from: { val: 0 },
  });

  //arrow icon movement
  const downArrowStyles = useSpring({
    loop: { reverse: true },
    from: { y: 0 },
    to: { y: 10 },
  });
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(5, 31, 46, 0.7)",
            borderRadius: "10px",
            marginTop: "5%",
            marginBottom: "1%",
            paddingBottom: "5%",
          }}
        >
          <Grid item xs={4} textAlign="center">
            <animated.h1 className="stats" id="project-data">
              {propsTotalProjs.val.to((val) => Math.floor(val))}
            </animated.h1>
            <Typography
              varient="h3"
              sx={{
                color: "#c7feff",
                fontFamily: "Roboto Condensed",
              }}
            >
              projects funded
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <animated.h1 className="stats" id="supporter-data">
              {propsTotalSupporters.val.to((val) => Math.floor(val))}
            </animated.h1>
            <Typography
              varient="h3"
              sx={{
                color: "#d6f9d1",
                fontFamily: "Roboto Condensed",
              }}
            >
              supported
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <animated.h1 className="stats" id="fund-data">
              {propsTotalRaised.val.to((val) => Math.floor(val))}
            </animated.h1>
            <Typography
              varient="h3"
              sx={{
                color: "#fbfda7",
                fontFamily: "Roboto Condensed",
              }}
            >
              USD raised
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <IconButton>
          <animated.div
            style={{
              ...downArrowStyles,
            }}
          >
            <KeyboardArrowDown sx={{ color: "#fdfe9c", fontSize: 70 }} />
          </animated.div>
        </IconButton>
      </Grid>
    </Grid>
  );
}
