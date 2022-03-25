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
        <Typography variant="h4" color="white" fontFamily="Roboto Condensed">
          Featured
        </Typography>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "2%",
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
