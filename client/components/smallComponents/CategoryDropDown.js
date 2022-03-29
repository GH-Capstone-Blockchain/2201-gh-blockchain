import React, { useEffect } from "react";
import { Select, MenuItem, Typography } from "@mui/material";
import { fetchCategories } from "../../store/categories";
import { connect } from "react-redux";

function CategoriesDropDown(props) {
  useEffect(() => {
    props.fetchCategories();
  }, []);
  if (!props.categories) return <Typography>Loading</Typography>;

  const categoryList = [];
  console.log(categoryList);
  return (
    <Select fullWidth id="category-dropdown" value={""} label="Category">
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {props.categories.map((category) =>
        !categoryList.includes(category.category) ? (
          <MenuItem key={category.id} value={category.id}>
            {category.category}
          </MenuItem>
        ) : (
          <div></div>
        )
      )}
    </Select>
  );
}

const mapState = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  };
};

export default connect(mapState, mapDispatch)(CategoriesDropDown);
