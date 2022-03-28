import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { connect } from 'react-redux';
import { updateProject, fetchProject } from '../store/singleProject';
import { useParams } from 'react-router-dom';

const ProjectDashboard = (props) => {
  let params = useParams();
  let id = parseInt(params.id);

  const [form, setForm] = useState({
    name: props.project.name || '',
    description: '',
    imageUrl: '',
    videoUrl: props.project.videoUrl || '',
    project_timeline_start: props.project_timeline_start || '',
    project_timeline_end: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.fetchProject(id);
      } catch (error) {
        console.error('error in fetchData', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.type === 'date') value = new Date(value);
    setForm({ ...form, [e.target.id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateProject(form);
  };
  console.log('PROPS', props);
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          required
          id="name"
          label="Project Name"
          onChange={handleChange}
        />
        <TextField
          id="description"
          label="Project Description"
          multiline
          rows={4}
          onChange={handleChange}
        />
        <TextField
          required
          id="imageUrl"
          label="Image URL"
          onChange={handleChange}
        />
        <TextField
          required
          id="videoUrl"
          label="Video URL"
          onChange={handleChange}
        />
        <TextField
          required
          type="date"
          id="campaign_timeline_start"
          label="Campaign Start Date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <TextField
          required
          type="date"
          id="campaign_timeline_end"
          defaultValue={new Date()}
          label="Campaign End Date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Submit</Button>
    </Box>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
    project: state.project.project,
    scientists: state.project.scientists,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateProject: (project) => dispatch(updateProject(project)),
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
  };
};

export default connect(mapState, mapDispatch)(ProjectDashboard);
