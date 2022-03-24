import axios from 'axios';

const SET_SCIENTISTS = 'SET_SCIENTISTS';

const setScientists = (scientists) => {
    return {
        type: SET_SCIENTISTS,
        scientists
    }
}

export const fetchScientists = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('/api/scientists');
            dispatch(setScientists(data))
        } catch (error) {
            console.error('error in fetchScientists thunk', error);
        }
    }
}

const initialState = [];

export default function scientistsReducer(state=initialState, action){
    switch(action.type) {
        case SET_SCIENTISTS:
            return action.scientists;
        default:
            return state;
    }
}