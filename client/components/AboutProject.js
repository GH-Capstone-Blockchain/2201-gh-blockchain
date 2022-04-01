import React from 'react'
import {
    Typography,
    Box,
  } from "@mui/material";
  import { convertDate } from "./smallComponents/utilities";


export default function AboutProject(props) {
    return (
       <Box sx={{display:'flex', flexDirection:'column', width:'80%', margin:'30px'}}>
        <Typography
          margin="15px"
          sx={{
            fontSize: "30px",
            fontFamily: "Roboto Condensed",
            color: "#051f2e",
            fontWeight: "bold",
            textDecoration:'underline'
          }}
        >
          About this project:
        </Typography>

        {/* Project Timeline */}
        <Box sx={{ display: "flex", flexDirection: "row"}}>
          <Typography
            margin="15px"
            sx={{fontFamily: "Roboto Condensed", fontWeight: "bold" , }}
          >
            Project Timeline:{" "}
          </Typography>
          <Typography variant="body1" margin="15px" sx={{fontFamily: "Roboto Condensed",}}>
            {props.project
              ? convertDate(props.project.project_timeline_start)
              : ""}{" "}
            to{" "}
            {props.project
              ? convertDate(props.project.project_timeline_end)
              : ""}
          </Typography>
        </Box>
        {/* Project description */}
        <Typography variant="body1" margin="15px" component="h5">
          {props.project.description}
        </Typography>
        </Box>   
    )
}