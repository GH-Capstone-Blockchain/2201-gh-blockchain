import React from "react";
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
import {Link} from 'react-router-dom'

export default function ProjectCard(props) {
  const project = props.project;
  const shortenedDescription = () => {
    if (project.description.length > 150) {
      return project.description.slice(0, 150).concat("...");
    } else {
      return project.description;
    }
  };
  return (
    
    <Card sx={{ maxWidth: 500 }} variant="outlined">
      <CardActionArea component={Link} to={`projects/${project.id}`}>
        <CardMedia component="img" height="140" image={project.imageUrl} />
  
        <CardContent>
          <Box
            sx={{ height: 40, textOverflow: "ellipsis", overflow: "hidden" }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {props.project.name}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: 90, overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {shortenedDescription()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Typography>Goal: {project.fundraising_goal}</Typography>
          <LinearProgress
            variant="determinate"
            value={60}
            sx={{ width: 100 }}
          />
        </Box>

        <Button size="small" color="primary">
          +Donate
        </Button>
        
      </CardActions>
    </Card>
    
  );
}
