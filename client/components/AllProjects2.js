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
  School,
  Science, 
  Cyclone, 
  SettingsSuggest,
  People, 
  Healing,
  Brush,
  BackupTable,
  Public,
  EmojiObjects,
  AccountBalance, 
  Android
} from "@mui/icons-material";
import { connect } from "react-redux";
import { fetchProjects } from "../store/projects";
import ProjectCard from "./ProjectCard";
import {categoriesArr, generateColor} from './smallComponents/utilities'


function AllProjects(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const allProjects = props.projects || [];
  const filteredProjects =
    !filter || filter === "All"
      ? allProjects
      : allProjects.filter((project) => {
          if (project.categories.length > 0) {
            return project.categories.map(category => category.category).includes(filter)
          }
        });

  useEffect(async () => {
    await props.fetchProjects();
    // await props.filterProjects();
    setIsLoading(false);
  }, []);
  if (isLoading) return <img src={"https://i.stack.imgur.com/ATB3o.gif"} />;
  return (
    <Box
    // sx={{
    //   backgroundColor: "rgba(5, 31, 46, 0.7)",
    // }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{ marginTop: "130px", marginBottom: "30px" }}
          textAlign="center"
        >
          <Typography
            variant="h2"
            color="#051f2e"
            sx={{ fontFamily: "Roboto Condensed" }}
          >
            Explore Research
          </Typography>
        </Grid>

        {/* <Grid item xs={1} /> */}
        <Grid item xs={12} style={{ maxWidth: "1000px" }}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {" "}
            {categoriesArr.map((category) => {
              return (
                <Grid item key={category.name}>
                  <Button
                    variant="outlined"
                    startIcon={category.icon}
                    style={{
                      color: generateColor(),
                      margin: "5px",
                    }}
                    onClick={() => {
                      setFilter(category.name);
                    }}
                  >
                    {category.name}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={2.5} marginTop="30px">
            {filteredProjects.map((project) => (
              <Grid key={project.id} item xs={12} md={4}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* <Grid item xs={1} /> */}
        <Grid item xs={12} sx={{ margin: "7%" }}></Grid>
      </Grid>
    </Box>
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
