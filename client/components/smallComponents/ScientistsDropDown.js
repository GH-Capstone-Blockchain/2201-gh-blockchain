import React, { useState, useEffect } from "react";
import {Select, MenuItem, Typography} from '@mui/material'
import {fetchScientists} from '../../store/scientists'
import {connect} from 'react-redux'

function ScientistsDropDown(props) {
    
    useEffect(() => {
        props.fetchScientists()
    },[])
    if(!props.scientists) return <Typography>Loading</Typography>
  return (
    <Select
      id="scientist-dropdown"
      value={""}
      label="Scientist"
    >

      <MenuItem value="">
        <em>None</em>
      </MenuItem>
        {props.scientists.map(scientist => {
                <MenuItem key = {scientist.id} value={scientist.id}>
                  {/* {`${scientist.user.firstName} ${scientist.user.lastName}`} */}
                  HELLO
                </MenuItem>
        })}

    </Select>
  );
}

const mapState = (state) => {
    return {
      scientists: state.scientists,
    }
  }
  
  
  const mapDispatch = (dispatch) => {
    return {
      fetchScientists: () => dispatch(fetchScientists()),
    };
  };
  
  export default connect(mapState, mapDispatch)(ScientistsDropDown);
