import axios from "axios";

// action type constants

const FETCH_PROJECT = "FETCH_PROJECT";
const UPDATE_PROJECT = "UPDATE_PROJECT";

// action creators

const _fetchProject = (project, scientists) => {
  return {
    type: FETCH_PROJECT,
    project,
    scientists,
  };
};

const _updateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
    project: project.project,
    scientists: project.scientists,
  };
};

// thunks

export const fetchProject = (projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/project/${projectId}`);
      const scientists = data.scientists;
      const project = data.project;
      dispatch(_fetchProject(project, scientists));
    } catch (error) {
      console.error("error in fetchProject thunk", error);
    }
  };
};

export const updateProject = (updatedProject) => {
  const token = window.localStorage.getItem('token')
  return async (dispatch) => {
    try {
      await axios.put(`/api/projects/${updatedProject.id}`, updatedProject, {
        headers: {
          authorization: token,
        }});
      const { data } = await axios.get(`/api/project/${updatedProject.id}`);
      dispatch(_updateProject(data));
    } catch (error) {
      console.error("Error in updateProject thunk", error);
    }
  };
};


export const releaseFunds = (projectId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/projects/${projectId}`, { isFunded: true });
      const { data } = await axios.get(`/api/project/${projectId}`);
      dispatch(_updateProject(data));
    } catch (error) {
      console.error("error in release funds", error);
    }
  };
};

// reducer

export default function singleProjectReducer(
  state = { project: {}, scientists: [] },
  action
) {
  switch (action.type) {
    case FETCH_PROJECT:
      return {
        ...state,
        project: action.project,
        scientists: action.scientists,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        project: action.project,
        scientists: action.scientists,
      };
    default:
      return state;
  }
}
