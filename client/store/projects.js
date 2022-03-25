import axios from 'axios'

const SET_PROJECTS = 'SET_PROJECTS'
const ADD_PROJECT = 'ADD_PROJECT'

export const setProjects = (projects) => {
    return {
        type: SET_PROJECTS,
        projects
    }
}

export const addProject = (newProject) => {
    return {
        type: ADD_PROJECT,
        newProject
    }
}

export const fetchProjects = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('/api/projects')
            dispatch(setProjects(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const createProject = (newProject) => {
    return async (dispatch) => {
        try {
            console.log('====', newProject)
            const {data} = await axios.post('/api/projects', newProject)
            console.log('???????', data)
            dispatch(addProject(data))
        } catch (error) {
            
        }
    }
}

const initialState = []

export default function projectsReducer(state=initialState, action){
    switch (action.type) {
        case SET_PROJECTS:
            return action.projects;

        case ADD_PROJECT: 
            return [...state, action.newProject]

        default:
            return state
    }
}