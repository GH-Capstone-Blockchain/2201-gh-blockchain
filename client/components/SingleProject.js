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
      <Typography variant="h4" component="h3">
        {props.project.name}
      </Typography>
      {/* Scientists */}
      <Typography variant="h6" component="h5">
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
      <img src="https://images.immediate.co.uk/production/volatile/sites/4/2021/07/king-sharkeating-e14a18e.jpg?quality=90&resize=620%2C413" />
      {/* <img src={props.project.imgUrl} /> */}
      <Typography variant="h5" component="h5">
        About this project:
      </Typography>
      <Typography variant="body1" component="desc">{props.project.description}</Typography>
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
