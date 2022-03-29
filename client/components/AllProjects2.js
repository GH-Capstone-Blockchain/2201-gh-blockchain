import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import {
  Biotech,
  Functions,
  Spa,
  DirectionsWalk,
  Computer,
  Psychology,
} from "@mui/icons-material";
import { connect } from "react-redux";
import { fetchProjects } from "../store/projects";
import ProjectCard from "./ProjectCard";

const categoriesArr = [
  { name: "Biology", icon: <Biotech /> },
  { name: "Ecology", icon: <Spa /> },
  { name: "Mathematics", icon: <Functions /> },
  { name: "Anthropology", icon: <DirectionsWalk /> },
  { name: "Computer Science", icon: <Computer /> },
  { name: "Psychology", icon: <Psychology /> },
];

function AllProjects(props) {
  const [isLoading, setIsLoading] = useState(true);

  const generateColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b},0.8)`;
  };

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
      <Grid item xs={12} sx={{ margin: "5%" }} />
      <Grid item xs={1} />
      <Grid item xs={10} style={{ maxWidth: "1000px" }}>
        {categoriesArr.map((category) => {
          return (
            <Button
              type="submit"
              key={category.name}
              variant="outlined"
              startIcon={category.icon}
              style={{
                color: generateColor(),
                margin: "10px",
              }}
            >
              {category.name}
            </Button>
          );
        })}
        <Grid container spacing={3} marginTop="30px">
          {props.projects.map((project) => (
            <Grid key={project.id} item xs={4}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={1} />
      <Grid item xs={12} sx={{ margin: "7%" }}></Grid>
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
