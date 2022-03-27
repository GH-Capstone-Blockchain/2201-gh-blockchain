import React, { useEffect, useState } from "react";
import { Grid, Box, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import { connect } from "react-redux";
import { fetchProjects } from "../store/projects";
import ProjectCard from "./ProjectCard";
import PersistentDrawerLeft from "./SideBarSearch";
import CssBaseline from "@mui/material/CssBaseline";

function AllProjects(props) {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(async () => {
    await props.fetchProjects();
    setIsLoading(false);
  }, []);
  if (isLoading) return <img src={"https://i.stack.imgur.com/ATB3o.gif"} />;
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "#051f2e",
      }}
    >
      <Grid item xs={12} sx={{ margin: "7%" }}></Grid>
      <Grid item xs={1} />
      <Grid item xs={10} style={{ maxWidth: "1000px" }}>
        <Grid container spacing={3}>
          {props.projects.map((project) => (
            <Grid key={project.id} item xs={4}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={1} />
    </Grid>
  );
}

const mapState = (state) => {
  return {
    projects: state.projects,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
