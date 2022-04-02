import axios from 'axios';

const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const _updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user
    }
}

export const fetchUser = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`/api/users/${id}`);
            dispatch(setUser(data))
        } catch (error) {
            console.error('error in fetchUser thunk', error);
        }
    }
}

export const updateUser = (updatedUser) => {
    return async (dispatch) => {
        try {
            await axios.put(`/api/users/${updatedUser.id}`, updatedUser);
            const { data } = await axios.get(`/api/users/${updatedUser.id}`)
            dispatch(_updateUser(data));
        } catch (error) {
            console.error('Error in updateUser thunk', error);
        }
    }
}

const initialState = [];

export default function userReducer(state=initialState, action){
    switch(action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}