import React, { useState, useEffect } from "react";
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
import { convertDate, projectToUSD } from "./smallComponents/utilities";
import { useNavigate } from "react-router-dom";

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
              Goal: ${usdVals.fundraisingGoal}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={
                usdVals.percentReached > 100 ? 100 : usdVals.percentReached
              }
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
              {usdVals.percentReached > 100 ? 100 : usdVals.percentReached}%
            </Typography>
          </Box>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Typography
              margin="15px"
              sx={{
                fontFamily: "Roboto Condensed",
                fontWeight: "bold",
                textDecoration:'underline',
                alignSelf:'center',
                height:'10px'
              }}
            >
              Campaign Timeline:
            </Typography>
            <Box sx={{display: "flex", flexDirection: "row", alignItems:'center', textAlign:'center'}}>
            <Typography sx={{ fontFamily: "Roboto Condensed" }}>
              {props.project
                ? convertDate(props.project.campaign_timeline_start)
                : ""}
            </Typography>
            <Divider></Divider>
            <Typography
              margin="15px"
              sx={{ fontFamily: "Roboto Condensed", fontWeight: "bold" }}
            >
              <strong>to</strong> <br></br>
            </Typography>
            <Typography sx={{ fontFamily: "Roboto Condensed" }}>
              {props.project
                ? convertDate(props.project.campaign_timeline_end)
                : ""}
            </Typography>
          </Box>
          </Box>
          {props.loggedIn ? (
            <Box sx={{ marginTop: "20px" }}>
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
              <Button
                sx={{ alignSelf: "center", marginTop: "12px" }}
                onClick={async () => {
                  await props.handleDonate(donation);
                  textInput.current.value = "";
                }}
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
