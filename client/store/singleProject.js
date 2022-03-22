import axios from 'axios';

// action type constants

const FETCH_PROJECT = 'FETCH_PROJECT';

// action creators

const _fetchProject = (project, scientists) => {
    return {
        type: FETCH_PROJECT, 
        project, 
        scientists
    }
}

// thunks

export const fetchProject = (projectId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/project/${projectId}`);
            const scientists = data.scientists;
            const project = data.project;
            dispatch(_fetchProject(project, scientists))
        } catch (error) {
            console.error('error in fetchProject thunk', error);
        }
    }
}

// reducer

export default function singleProjectReducer(state = {project: {}, scientists: []}, action) {
    switch (action.type) {
        case FETCH_PROJECT:
            return {...state, project: action.project, scientists: action.scientists};
        default:
            return state;
    }
}