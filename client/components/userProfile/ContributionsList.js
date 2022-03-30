import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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
import { fetchContributionsByUser } from "../../store/contributions";


const ContributionsList = (props) => {
  useEffect(async () => {
    await props.fetchContributionsByUser(props.user.id);
  }, []);

  return (
    <div>
      <h1>Projects I Contributed To </h1>
      {props.contributions.map((contribution) => {
        const project = contribution.project;
        const shortenedDescription = () => {
          if (project.description.length > 150) {
            return project.description.slice(0, 150).concat("...");
          } else {
            return project.description;
          }
        };
        return (
          <Card sx={{ maxWidth: 500 }} variant="outlined" key={contribution.id}>
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
    contributions: state.contributions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchContributionsByUser: (userId) =>
      dispatch(fetchContributionsByUser(userId)),
  };
};

export default connect(mapState, mapDispatch)(ContributionsList);
