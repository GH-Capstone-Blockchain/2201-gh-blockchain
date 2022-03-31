import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { connect } from "react-redux";
import { createProject } from "../store/projects";
import ScientistsDropDown from "./smallComponents/ScientistsDropDown";
import { loadWeb3 } from "../web3/web3";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  YouTubeAlert,
  FundrasingGoalAlert,
  WalletAlert,
  ImageAlert,
  NoMetaMaskError,
} from "./smallComponents/InfoAlerts";
import { useNavigate } from "react-router-dom";
import { fetchConversion } from "../store/conversion";
import AccessForbiddenPage from "./AccessForbiddenPage";

function AddProjectForm(props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    project_wallet_address: "",
    project_timeline_start: "",
    project_timeline_end: "",
    campaign_timeline_start: "",
    campaign_timeline_end: "",
    fundraising_goal: "",
  });
  const [youtubeAlert, setyoutubeAlert] = useState(false);
  const [goalAlert, setGoalAlert] = useState(false);
  const [addressAlert, setAddressAlert] = useState(false);
  const [imageAlert, setImageAlert] = useState(false);
  const [noMetamask, setNoMetamask] = useState(false);

  const [address, setAddress] = useState(null);

  useEffect(async () => {
    const accountAddress = await loadWeb3();
    if (accountAddress) setAddress(accountAddress[0]);
    if (!accountAddress) setNoMetamask(true);
    props.fetchConversion();
  }, []);
  const handleClose = () => {
    setyoutubeAlert(false);
    setGoalAlert(false);
    setAddressAlert(false);
    setImageAlert(false);
    setNoMetamask(false);
  };
  const handleChange = (event) => {
    let value = event.target.value;
    if (event.target.id === "fundraising_goal")
      value = (value / props.conversion) * Math.pow(10, 18);
    if (event.target.id === "videoUrl")
      value = "https://www.youtube.com/embed/" + value;
    if (event.target.type === "date") value = new Date(value);
    setForm({ ...form, [event.target.id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.createProject({
      project: form,
      scientists: [props.auth.scientist.id],
      address: address,
    });
    navigate("/projects");
  };

  return (
    <>
      {!props.auth || !props.auth.scientist ? (
        <AccessForbiddenPage />
      ) : (
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
          <NoMetaMaskError handleClose={handleClose} open={noMetamask} />
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
                sx={{ fontFamily: "Roboto Condensed" }}
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
                    inputProps={{ maxLength: 90 }}
                    onChange={handleChange}
                  />
                </Grid>
                {/* <Grid item xs={2}>
              <ScientistsDropDown />
            </Grid> */}
                <Grid
                  item
                  xs={4}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <TextField
                    fullWidth
                    id="fundraising_goal"
                    label="Fundraising Goal"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    onChange={handleChange}
                  />
                  <Button>
                    <InfoOutlinedIcon onClick={() => setGoalAlert(true)} />
                  </Button>
                  <FundrasingGoalAlert
                    handleClose={handleClose}
                    open={goalAlert}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <TextField
                    fullWidth
                    required
                    error={
                      form.project_wallet_address.length > 0 &&
                      !form.project_wallet_address.match(/^0x[a-fA-F0-9]{40}$/)
                    }
                    type="string"
                    id="project_wallet_address"
                    label="Project Wallet Address"
                    onChange={handleChange}
                  />
                  <Button>
                    <InfoOutlinedIcon onClick={() => setAddressAlert(true)} />
                  </Button>
                  <WalletAlert handleClose={handleClose} open={addressAlert} />
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
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      <TextField
                        fullWidth
                        required
                        id="imageUrl"
                        label="Image URL"
                        onChange={handleChange}
                      />{" "}
                      <Button>
                        <InfoOutlinedIcon onClick={() => setImageAlert(true)} />
                      </Button>
                      <ImageAlert handleClose={handleClose} open={imageAlert} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      <TextField
                        fullWidth
                        required
                        id="videoUrl"
                        label="YouTube Video ID"
                        inputProps={{ maxLength: 11 }}
                        onChange={handleChange}
                      />
                      <Button>
                        <InfoOutlinedIcon
                          onClick={() => setyoutubeAlert(true)}
                        />
                      </Button>
                      <YouTubeAlert
                        handleClose={handleClose}
                        open={youtubeAlert}
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
      )}
    </>
  );
}

const mapState = (state) => {
  return {
    auth: state.auth,
    conversion: state.conversion,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createProject: (newProject) => dispatch(createProject(newProject)),
    fetchConversion: () => dispatch(fetchConversion()),
  };
};

export default connect(mapState, mapDispatch)(AddProjectForm);
