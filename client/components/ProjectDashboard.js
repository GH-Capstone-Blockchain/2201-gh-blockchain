import React, { useEffect, useState } from 'react';
import { Grid, Box, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { connect } from 'react-redux';
import { updateProject, fetchProject } from '../store/singleProject';
import { useParams } from 'react-router-dom';

const ProjectDashboard = (props) => {
  let params = useParams();
  let id = parseInt(params.id);

  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    imageUrl: '',
    videoUrl: '',
    project_timeline_start: '',
    project_timeline_end: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.fetchProject(id);
        if (props.project) {
          await setForm({
            id: id,
            name: props.project.name,
            description: props.project.description,
            imageUrl: props.project.imageUrl,
            videoUrl: props.project.videoUrl,
            project_timeline_start: props.project.project_timeline_start,
            project_timeline_end: props.project.project_timeline_end,
          });
        }
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
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // background: "#051f2e",
      }}
    >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid
          item
          xs={12}
          sx={{ marginTop: '20%', marginBottom: '10%' }}
          textAlign="center"
        >
          <Typography
            variant="h2"
            color="#051f2e"
            sx={{ fontFamily: 'Roboto Condensed', fontSize: '50px' }}
          >
            Project Dashboard
          </Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={12} style={{ maxWidth: '800px' }}>
          <Grid
            container
            // spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              // background: "#051f2e",
            }}
          >
            <Grid item xs={8}>
              <TextField
                fullwidth
                required
                id="name"
                label="Project Name"
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                defaultValue={props.project.name}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullwidth
                id="description"
                label="Project Description"
                multiline
                rows={4}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                defaultValue={props.project.description}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                id="imageUrl"
                label="Image URL"
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                defaultValue={props.project.imageUrl}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                id="videoUrl"
                label="Video URL"
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                defaultValue={props.project.videoUrl}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                type="date"
                id="project_timeline_start"
                label="Project Start Date"
                defaultValue={new Date(props.project.project_timeline_start)}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                type="date"
                id="project_timeline_end"
                label="Project End Date"
                defaultValue={new Date(props.project.project_timeline_end)}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={12} marginBottom="50px"></Grid>
          <Grid
            container
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              // background: "#051f2e",
            }}
          >
            <Grid item xs={4}>
              <Button fullwidth type="submit" sx={{ marginBottom: '10%' }}>
                Submit
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button fullwidth type="submit" sx={{ marginBottom: '10%' }}>
                Release Funds
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12} style={{ maxWidth: '800px' }}>
        <Grid
          container
          // spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // background: "#051f2e",
          }}
        >
          {/* <List>
            <ListItem>
              <ListItemText primary={props.project.name}/>
            </ListItem>
          </List> */}
          
        </Grid>
      </Grid>
    </Grid>
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
