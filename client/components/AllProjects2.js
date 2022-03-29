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
  FactCheck,
} from "@mui/icons-material";
import { connect } from "react-redux";
import { fetchProjects, filterProjects } from "../store/projects";
import ProjectCard from "./ProjectCard";

const categoriesArr = [
  { name: "All", icon: <FactCheck /> },
  { name: "Biology", icon: <Biotech /> },
  { name: "Ecology", icon: <Spa /> },
  { name: "Mathematics", icon: <Functions /> },
  { name: "Anthropology", icon: <DirectionsWalk /> },
  { name: "Computer Science", icon: <Computer /> },
  { name: "Psychology", icon: <Psychology /> },
];

function AllProjects(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const generateColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b},0.8)`;
  };

  const allProjects = props.projects || [];
  const filteredProjects =
    !filter || filter === "All"
      ? allProjects
      : allProjects.filter((project) => {
          if (project.categories.length > 0) {
            return project.categories[0].category.includes(filter);
          }
        });

  console.log("************* ", filteredProjects);

  useEffect(async () => {
    await props.fetchProjects();
    // await props.filterProjects();
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
              key={category.name}
              variant="outlined"
              startIcon={category.icon}
              style={{
                color: generateColor(),
                margin: "10px",
              }}
              onClick={() => {
                setFilter(category.name);
                // props.filterProjects(category.name);
              }}
            >
              {category.name}
            </Button>
          );
        })}
        <Grid container spacing={3} marginTop="30px">
          {filteredProjects.map((project) => (
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
    filterProjects: (filter) => dispatch(fetchProjects(filter)),
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
