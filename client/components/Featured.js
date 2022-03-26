import ProjectCard from "./ProjectCard";
import { connect } from "react-redux";
import React from "react";

//style
import { Typography, Grid, Box } from "@mui/material";

export default function Featured(props) {
  //first three projects will be featured
  const projects = props.projects.slice(0, 3);

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
        <Typography
          variant="h4"
          color="white"
          fontFamily="Roboto Condensed"
          marginBottom="10px"
        >
          Featured Projects
        </Typography>
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid key={project.id} item xs={4}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
