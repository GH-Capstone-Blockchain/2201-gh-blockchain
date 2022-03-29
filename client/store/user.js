import axios from 'axios';

const SET_USER = 'SET_USER';

const setUser = (user) => {
    return {
        type: SET_USER,
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

const initialState = [];

export default function userReducer(state=initialState, action){
    switch(action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}