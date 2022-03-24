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

export default function ProjectCard(props) {
  const project = props.project;
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={project.imageUrl}
        />
        <CardContent>
          <Box sx={{height: 40, textOverflow: 'ellipsis', overflow: 'hidden' }}>
          <Typography gutterBottom variant="h6" component="div" >
            {props.project.name}
          </Typography></Box>
          <Typography variant="body2" color="text.secondary" sx={{height: 90, overflow: 'hidden', textOverflow: 'ellipsis'}}>
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box sx={{ display: 'flex', alignItems: 'center', width: "100%" }}>
          <Typography>Goal: {project.fundraising_goal}</Typography>
          <LinearProgress variant="determinate" value={60} sx={{width: 100}}/>
        </Box>

        <Button size="small" color="primary">
          +Donate
        </Button>
      </CardActions>
    </Card>
  );
}
