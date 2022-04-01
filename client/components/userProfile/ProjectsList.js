import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProjectsList = (props) => {
  const projects = props.projects;

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Grid item xs={12} textAlign="left">
        <Typography
          variant="h4"
          color="primary.dark"
          sx={{ fontFamily: "Roboto Condensed" }}
        >
          My Projects{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ maxWidth: "1000px" }}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          spacing={2}
        >
          {projects.map((project) => {
            const shortenedDescription = () => {
              if (project.description.length > 150) {
                return project.description.slice(0, 150).concat("...");
              } else {
                return project.description;
              }
            };
            return (
              <Grid key={project.id} item xs={12} md={6}>
                <Card sx={{ maxWidth: 500 }} variant="outlined">
                  <CardActionArea
                    component={Link}
                    to={`/projects/${project.id}`}
                  >
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
                    {props.auth.password === props.user.password ? (
                      <CardContent>
                        <Link to={`/dashboard/${project.id}`}>
                          <Button>Project Dashboard</Button>
                        </Link>
                      </CardContent>
                    ) : null}
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectsList;
