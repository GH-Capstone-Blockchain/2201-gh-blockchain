import axios from "axios";

const SET_CATEGORIES = "SET_CATEGORIES";

const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories,
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/categories");
      dispatch(setCategories(data));
    } catch (error) {
      console.error("error in fetchCategories thunk", error);
    }
  };
};

const initialState = [];

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
