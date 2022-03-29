import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Button,
  LinearProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import { convertDate } from "./smallComponents/utilities";
import { useNavigate } from "react-router-dom";

export default function DonateCard(props) {
  const navigate = useNavigate();
  const [donation, setDonation] = useState(0);
  const project = props.project;
  const goal = Math.round(props.conversion * (project.fundraising_goal / Math.pow(10,18)));
  const contributions =
    Math.round(props.conversion * (project.totalDonations / Math.pow(10,18)) * 100) / 100;
  const percent = Math.floor((project.totalDonations / project.fundraising_goal) * 100);

  const handleChange = (event) => {
    setDonation(event.target.value);
  };

  console.log(props.conversion);

  return (
    <Card style={{ display: "flex", marginLeft: "20px", height: "80%" }}>
      <CardContent>
        {/* Progress Label */}

        {/* Need to add contribution data here */}
        <Box
          margin="15px"
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                alignSelf: "left",
                fontFamily: "Roboto Condensed",
                color: "#051f2e",
                fontWeight: "bold",
                alignText: "center",
                marginRight: "8px",
              }}
            >
              {" "}
              Goal: ${goal}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={percent > 100 ? 100 : percent}
              sx={{ width: 120, alignSelf: "center" }}
            />
            <Typography
              sx={{
                alignSelf: "right",
                fontFamily: "Roboto Condensed",
                color: "#051f2e",
                marginLeft: "8px",
              }}
            >
              {percent > 100 ? 100 : percent}%
            </Typography>
          </Box>

          <Typography
            margin="15px"
            sx={{ fontFamily: "Roboto Condensed", fontWeight: "bold" }}
          >
            Campaign Start:
          </Typography>
          <Typography>
            {props.project
              ? convertDate(props.project.campaign_timeline_start)
              : ""}
          </Typography>
          <Divider></Divider>
          <Typography
            margin="15px"
            sx={{ fontFamily: "Roboto Condensed", fontWeight: "bold" }}
          >
            <strong>Campaign End:</strong> <br></br>
          </Typography>
          <Typography>
            {props.project
              ? convertDate(props.project.campaign_timeline_end)
              : ""}
          </Typography>

          {props.loggedIn ? (
            <Box sx={{ marginTop: "20px" }}>
              <TextField
                id="donation"
                label="Donation Value"
                variant="outlined"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onChange={handleChange}
              />
              <Button
                sx={{ alignSelf: "center", marginTop: "12px" }}
                onClick={() => props.handleDonate(donation)}
              >
                DONATE
              </Button>
            </Box>
          ) : (
            <Button
              sx={{ alignSelf: "center", marginTop: "12px" }}
              onClick={() => navigate("/signup")}
            >
              SIGN UP TO DONATE
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
