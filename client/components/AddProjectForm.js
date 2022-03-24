import React, { useState } from "react";
import { Box, TextField, Button} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import {connect} from 'react-redux'
import { createProject } from "../store/projects";

function AddProjectForm(props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    project_timeline_start: "",
    project_timeline_end: "",
    campaign_timeline_start: "",
    campaign_timeline_end: "",
    fundraising_goal: "",
  });
  const [scientists, setScientists] = useState([])

  useEffect(()=> {
    setScientists([props.auth.scientists.id])
  })
  const handleChange=(event) => {
    let value = event.target.value
    // if(event.target.type === 'date') 
    setForm({...form, [event.target.id] : value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createProject(form)
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField required id="name" label="Project Name" onChange={handleChange}/>
        <TextField
          id="description"
          label="Project Description"
          multiline
          rows={4}
          onChange={handleChange}
        />
        <TextField required id="imageUrl" label="Image URL" onChange={handleChange}/>
        <TextField required id="videoUrl" label="Video URL" onChange={handleChange} />
        <TextField
          id="fundraising_goal"
          label="Fundraising Goal (in USD)"
          type='number'
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          onChange={handleChange}
        />
        <TextField
          required
          type='date'
          id="project_start_date"
          label="Project Start Date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <TextField
          required
          type='date'
          id="project_end_date"
          label="Project End Date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <TextField
          required
          type='date'
          id="campaign_start_date"
          label="Campaign Start Date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <TextField
          required
          type='date'
          id="campaign_end_date"
          defaultValue={new Date()}
          label="Campaign End Date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <TextField
          required
          type='string'
          id="project_wallet_address"
          label="Project Wallet Address"
          onChange={handleChange}
        />
      </div>
      <Button type='submit'>Submit</Button>
    </Box>
  );
}

const mapState = (state) => {
  return {
    auth: state.auth,
  }
}


const mapDispatch = (dispatch) => {
  return {
    createProject: (newProject) => dispatch(createProject(newProject)),
  };
};

export default connect(mapState, mapDispatch)(AddProjectForm);






{
  /* <LocalizationProvider dateAdapter={AdapterDateFns}>
<DesktopDatePicker
  label="Helper text example"
  value={new Date()}
  renderInput={(params) => (
    <TextField
      {...params}
      helperText={params?.inputProps?.placeholder}
    />
  )}
/>
</LocalizationProvider> */
}
