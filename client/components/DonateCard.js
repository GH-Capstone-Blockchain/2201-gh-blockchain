import React, { useState } from "react";
import {
  Typography,
  Button,
  LinearProgress,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import { convertDate, projectToUSD } from "./smallComponents/utilities";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 7.5,
  color: "#5babab",
}));

export default function DonateCard(props) {
  const navigate = useNavigate();
  const textInput = React.useRef(null);
  const [donation, setDonation] = useState(0);
  const project = props.project;
  let usdVals = projectToUSD(project, props.conversion);

  const handleChange = (event) => {
    setDonation(event.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h2"
          sx={{
            alignSelf: "left",
            fontFamily: "Roboto Condensed",
            color: "#5babab",
            fontWeight: "bold",
            alignText: "center",
            marginRight: "8px",
          }}
        >
          ${Math.round(usdVals.totalDonations)}
        </Typography>
        <Typography align="left">Raised</Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <BorderLinearProgress
              variant="determinate"
              value={
                usdVals.percentReached > 100 ? 100 : usdVals.percentReached
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{
                textAlign: "left",
                fontFamily: "Roboto Condensed",
                color: "#051f2e",
              }}
            >
              {usdVals.percentReached > 100 ? 100 : usdVals.percentReached}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{
                textAlign: "right",

                fontFamily: "Roboto Condensed",
                color: "#5babab",
                fontWeight: "bold",
              }}
            >
              {" "}
              Goal: ${usdVals.fundraisingGoal}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container></Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontFamily: "Roboto Condensed",
              fontWeight: "bold",
              alignSelf: "center",
              fontSize: "20px",
            }}
          >
            Campaign Timeline:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Typography
                color="primary.dark"
                sx={{ fontFamily: "Roboto Condensed" }}
              >
                {props.project
                  ? convertDate(props.project.campaign_timeline_start)
                  : ""}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                marginLeft="20px"
                marginRight="20px"
                sx={{ fontFamily: "Roboto Condensed", fontWeight: "bold" }}
              >
                to
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                color="primary.dark"
                sx={{ fontFamily: "Roboto Condensed" }}
              >
                {props.project
                  ? convertDate(props.project.campaign_timeline_end)
                  : ""}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {props.loggedIn ? (
        <Grid container sx={{ margin: "20px" }} spacing={2}>
          <Grid item>
            <TextField
              id="donation"
              label="Donation Value"
              variant="outlined"
              type="number"
              inputRef={textInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ alignSelf: "center", marginTop: "12px" }}
              onClick={async () => {
                await props.handleDonate(donation);
                textInput.current.value = "";
              }}
            >
              DONATE
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Button
          variant="contained"
          sx={{ alignSelf: "center", marginTop: "12px" }}
          onClick={() => navigate("/signup")}
        >
          SIGN UP TO DONATE
        </Button>
      )}
    </Grid>
  );
}
