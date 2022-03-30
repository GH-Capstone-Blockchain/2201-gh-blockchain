import React from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const NoProjectsToViewPage = () => {
  return (
    <div className="no-projects-to-view-page">
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
        {' '}
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', marginTop: '5%', marginBottom: '5%' }}
        ></Grid>
        <Typography
          variant="h5"
          margin="15px"
          sx={{
            fontFamily: 'Roboto Condensed',
            color: '#051f2e',
            fontWeight: 'bold',
          }}
        >
          You don't have any projects to view!
        </Typography>
        <Grid item xs={12}></Grid>
        <Link to="/addproject">
          <Button fullWidth variant="contained" color="secondary">
            Create A Project
          </Button>
        </Link>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', marginTop: '5%', marginBottom: '5%' }}
        ></Grid>
      </Grid>
    </div>
  );
};

export default NoProjectsToViewPage;
