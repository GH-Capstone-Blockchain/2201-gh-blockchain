import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProject } from '../store/singleProject';

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
  return <div>{props.project.name}</div>;
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
