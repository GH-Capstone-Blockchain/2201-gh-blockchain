import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProjectsByScientist } from "../../store/projects";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProjectsList = (props) => {
  useEffect(async () => {
    await props.fetchProjectsByScientist(props.user.id);
  }, []);

  const projects = props.projects;

  return (
    <div>
      <h1>Projects</h1>
      {projects.map((project) => {
        const shortenedDescription = () => {
          if (project.description.length > 150) {
            return project.description.slice(0, 150).concat("...");
          } else {
            return project.description;
          }
        };
        return (
          <Card sx={{ maxWidth: 500 }} variant="outlined" key={project.id}>
            <CardActionArea component={Link} to={`/projects/${project.id}`}>
              <CardMedia
                component="img"
                height="140"
                image={project.imageUrl}
              />

              <CardContent>
                <Box
                  sx={{
                    height: 40,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    {project.name}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    height: 90,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {shortenedDescription()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
};

const mapState = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProjectsByScientist: (scientistId) =>
      dispatch(fetchProjectsByScientist(scientistId)),
  };
};

export default connect(mapState, mapDispatch)(ProjectsList);
