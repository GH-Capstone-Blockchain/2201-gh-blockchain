import React from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProject } from '../store/singleProject';

class SingleProject extends React.Component {

  componentDidMount() {
      try {
          console.log('THIS.PROPS',);
        //   
      } catch (error) {
          console.error("error in component did mount", error);
      }
  }
  render() {
    console.log(this.props);
    return <div>Test Single Project</div>;
  }
}

const mapState = (state) => {
  return { project: state.project, scientists: state.scientists };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
