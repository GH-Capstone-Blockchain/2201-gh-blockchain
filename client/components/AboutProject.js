import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { convertDate } from "./smallComponents/utilities";

export default function AboutProject(props) {
  return (
    <Grid
      conainter
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "30px",
      }}
    >
      <Typography
        sx={{
          fontSize: "30px",
          fontFamily: "Roboto Condensed",
          color: "#5babab",
          fontWeight: "bold",
        }}
      >
        About this project
      </Typography>

      {/* Project Timeline */}
      <Grid item>
        <Grid container>
          <Grid item>
            <Typography
              sx={{
                fontFamily: "Roboto Condensed",
                fontWeight: "bold",
                marginRight: "30px",
              }}
            >
              Project Timeline:{" "}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ fontFamily: "Roboto Condensed" }}>
              {props.project
                ? convertDate(props.project.project_timeline_start)
                : ""}{" "}
              to{" "}
              {props.project
                ? convertDate(props.project.project_timeline_end)
                : ""}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* Project description */}
      <Grid item>
        <Typography
          marginTop="20px"
          sx={{
            fontSize: "18px",
            fontFamily: "Roboto Condensed",
          }}
        >
          {props.project.description}
        </Typography>
      </Grid>
    </Grid>
  );
}
