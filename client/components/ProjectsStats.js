import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import { animated, useSpring } from "react-spring";

export default function ProjectsStats() {
  //   const data = [
  //     { title: "projects funded", number: 2398 },
  //     { title: "supported", number: 13523 },
  //     { title: "raised", number: 78303927161 },
  //   ];
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

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(5, 31, 46, 0.7)",
        borderRadius: "10px",
        marginTop: "15%",
        marginBottom: "15%",
        paddingBottom: "5%",
      }}
    >
      {/* <Grid item xs={12}>
        <Typography variant="h4" color="white" fontFamily="Roboto Condensed">
          Total
        </Typography>
      </Grid> */}
      <Grid item xs={4} textAlign="center">
        <animated.h1 className="stats" id="project-data">
          {propsTotalProjs.val.to((val) => Math.floor(val))}
        </animated.h1>
        <Typography
          varient="h4"
          sx={{
            color: "#c7feff",
            fontFamily: "Roboto Condensed",
            fontSize: "1.5em",
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
          varient="h4"
          sx={{
            color: "#ddffc7",
            fontFamily: "Roboto Condensed",
            fontSize: "1.5em",
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
          varient="h4"
          sx={{
            color: "#fff9c7",
            fontFamily: "Roboto Condensed",
            fontSize: "1.5em",
          }}
        >
          USD raised
        </Typography>
      </Grid>
    </Grid>
  );
}
