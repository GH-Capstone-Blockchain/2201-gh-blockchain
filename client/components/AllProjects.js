import React, { useEffect, useState } from "react";
import { Grid, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { connect } from "react-redux";
import { fetchProjects } from "../store/projects";
import ProjectCard from "./ProjectCard";

function AllProjects(props) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
  await props.fetchProjects();
    setIsLoading(false)
  }, []);
if(isLoading) return <img src={'https://i.stack.imgur.com/ATB3o.gif'}/>
  return (
    <div>
      {/* <Box >
          <Drawer anchor="left" open={true} variant="permanent" sx={{margin:30}}>
            <List>
              <ListItem>
                <ListItemText primary="Hello" />
              </ListItem>
            </List>
          </Drawer>
        </Box> */}
      <Box sx={{ margin: 5 }}>
        <Grid container spacing={2}>
          {props.projects.map((project) => (
            <Grid key={project.id} item xs={4}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
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
