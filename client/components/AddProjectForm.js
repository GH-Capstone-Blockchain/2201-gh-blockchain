import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { connect } from "react-redux";
import { createProject } from "../store/projects";
import ScientistsDropDown from "./smallComponents/ScientistsDropDown";
import { loadWeb3 } from "../web3/web3";
import { Link } from "react-router-dom";

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

  const [address, setAddress] = useState(null);

  useEffect(async () => {
    let add = await loadWeb3();
    setAddress(add[0]);
  }, []);

  const handleChange = (event) => {
    let value = event.target.value;
    if (event.target.type === "date") value = new Date(value);
    setForm({ ...form, [event.target.id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createProject({
      project: form,
      scientists: [props.auth.scientist.id],
      address: address,
    });
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "#051f2e",
      }}
    >
      <Box
        component="form"
        sx={{}}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid
          item
          xs={12}
          sx={{ marginTop: "20%", marginBottom: "10%" }}
          textAlign="center"
        >
          <Typography
            variant="h2"
            color="#051f2e"
            sx={{ fontFamily: "Roboto Condensed", fontSize: "50px" }}
          >
            Create Your Project
          </Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={10} style={{ maxWidth: "800px" }}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // background: "#051f2e",
            }}
          >
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="name"
                label="Project Name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2}>
              <ScientistsDropDown />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                id="fundraising_goal"
                label="Fundraising Goal (in USD)"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="string"
                id="project_wallet_address"
                label="Project Wallet Address"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="description"
                label="Project Description"
                multiline
                rows={4}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // background: "#051f2e",
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    id="imageUrl"
                    label="Image URL"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    id="videoUrl"
                    label="Video URL"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // background: "#051f2e",
                }}
              >
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    type="date"
                    id="project_timeline_start"
                    label="Project Start Date"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    type="date"
                    id="project_timeline_end"
                    label="Project End Date"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    type="date"
                    id="campaign_timeline_start"
                    label="Campaign Start Date"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    required
                    type="date"
                    id="campaign_timeline_end"
                    defaultValue={new Date()}
                    label="Campaign End Date"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={12} marginBottom="100px">
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  // background: "#051f2e",
                }}
              >
                <Grid item xs={8} />
                <Grid item xs={2}>
                  <Link to="/">
                    <Button fullWidth variant="contained" color="secondary">
                      CANCEL
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={2}>
                  <Button fullWidth type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

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
