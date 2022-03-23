import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProject } from '../store/singleProject';
import { Typography, Box } from '@mui/material';


const SingleProject = (props) => {
  let params = useParams();
  let id = parseInt(params.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.fetchProject(id);
      } catch (error) {
        console.error('error in fetchData', error);
      }
    };
    fetchData();
  }, []);

  console.log(props);
  if (!props.project) {
    return <div>Data is loading...</div>;
  }
  return (
    <div>
      {/* Project Name */}
      <Typography variant="h4" component="h3" margin="15px" sx={{ fontWeight: "bold" }}>{props.project.name}</Typography>

      {/* Authors (AKA Scientists) */}
      <Typography variant="h6" component="h5" margin="15px">
        By:{' '}
        {props.scientists.map((scientist, idx) => {
          let firstName =
            scientist.user.firstName[0].toUpperCase() +
            scientist.user.firstName.slice(1);
          let lastName =
            scientist.user.lastName[0].toUpperCase() +
            scientist.user.lastName.slice(1);
          if (idx === props.scientists.length - 1) {
            return `${firstName} ${lastName}`;
          } else {
            return `${firstName} ${lastName}, `;
          }
        })}
      </Typography>

      {/* Hero image */}
      <Box margin="15px">
      <img src={props.project.imageUrl}/>
      </Box>
      
      {/* About this project subtitle */}
      <Typography variant="h6" margin="15px" sx={{ fontWeight: "bold" }}>About this project:</Typography>
      
      {/* Project description */}
      <Typography variant="body1" margin="15px" component="h5">{props.project.description}</Typography>
      
      {/* Project Start */}
      <Typography variant="h7" margin="15px" sx={{ fontWeight: "bold" }}>Project start: </Typography>
      
      <Typography variant="body1" margin="15px" component="h5">{props.project.project_timeline_start}</Typography>
      
      {/* Project End */}
      <Typography variant="h7" margin="15px" sx={{ fontWeight: "bold" }}>Project end: </Typography>
      
      <Typography variant="body1" margin="15px" component="h5">{props.project.project_timeline_end}</Typography>
    </div>
  );
};

const mapState = (state) => {
  return {
    project: state.project.project,
    scientists: state.project.scientists,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
