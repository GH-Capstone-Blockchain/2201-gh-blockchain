import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Button,
  LinearProgress
} from "@mui/material";
import { convertDate } from "./smallComponents/utilities";

export default function DonateCard(props) {
  const project = props.project;
  const goal = Math.round(props.conversion * project.fundraising_goal);
  const contributions =
    Math.round(props.conversion * project.totalDonations * 100) / 100;
  const percent = Math.floor((contributions / goal) * 100);

  return (
    <Card style={{ display: 'flex', marginLeft: '20px', height: '80%'}}>
      <CardContent>
        {/* Progress Label */}

        {/* Need to add contribution data here */}
        <Box margin="15px" sx={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: 'center' 
            }}
          >
            <Typography
              sx={{
                alignSelf: "left",
                fontFamily: "Roboto Condensed",
                color: "#051f2e",
                fontWeight: "bold",
                alignText:'center',
                marginRight: '8px'
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
                marginLeft: '8px'
              }}
            >
              {percent > 100 ? 100 : percent}%
            </Typography>
          </Box>

          <Typography margin="15px" sx={{fontFamily: "Roboto Condensed", fontWeight: 'bold'}}>
           Campaign Start:
            </Typography>
            <Typography>
            {props.project
              ? convertDate(props.project.campaign_timeline_start)
              : ""}
              </Typography>
          <Divider></Divider>
          <Typography margin="15px" sx={{fontFamily: "Roboto Condensed", fontWeight: 'bold'}}>
            <strong>Campaign End:</strong>{" "}<br></br>
            </Typography>
            <Typography>
            {props.project
              ? convertDate(props.project.campaign_timeline_end)
              : ""}
          </Typography>
        <Button sx={{alignSelf:'center', marginTop:'12px'}}onClick={props.handleDonate}>DONATE</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
