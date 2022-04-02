import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';

const UpdateUser = (props) => {

  let handleChange = props.handleChange;
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Grid item xs={12}>
        <TextField
          fullwidth="true"
          required
          id="firstName"
          label="First Name"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ maxLength: 90 }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullwidth="true"
          required
          id="lastName"
          label="Last Name"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ maxLength: 90 }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullwidth="true"
          required
          id="profileImg"
          label="Profile Image"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ maxLength: 90 }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullwidth="true"
          id="bio"
          label="Bio"
          multiline
          rows={4}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default UpdateUser;