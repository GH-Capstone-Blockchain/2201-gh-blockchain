import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";

import React from "react";

//style
import { Typography, Grid, Box, Button } from "@mui/material";
import { Fade } from "react-awesome-reveal";

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
        marginTop: "10%",
      }}
    >
      <Grid item xs={8} md={6}>
        <Typography
          variant="h4"
          color="white"
          fontFamily="Roboto Condensed"
          marginBottom="10px"
        >
          Featured Projects
        </Typography>
      </Grid>
      <Grid item xs={4} md={6} textAlign="right">
        <Link to="/projects">
          <Button variant="contained">See All</Button>
        </Link>
      </Grid>

      <Fade bottom>
        <Grid item xs={12}>
          <Box
            sx={{
              marginTop: "10px",
            }}
          >
            <Grid container spacing={2}>
              {projects.map((project) => (
                <Grid key={project.id} item xs={12} md={4}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Fade>
    </Grid>
  );
}
