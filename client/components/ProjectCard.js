import React, { useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchConversion } from "../store/conversion";
import { connect } from "react-redux";
import {projectToUSD} from './smallComponents/utilities'


function ProjectCard(props) {
  useEffect(() => {
    props.fetchConversion();
  }, []);
  const project = props.project;
  const shortenedDescription = () => {
    if (project.description.length > 100) {
      return project.description.slice(0, 100).concat("...");
    } else {
      return project.description;
    }
  };
  let usdVals = projectToUSD(project, props.conversion);


  return (
    <Card sx={{ maxWidth: 500 }} variant="outlined">
      <CardActionArea component={Link} to={`/projects/${project.id}`}>
        <CardMedia component="img" height="140" image={project.imageUrl} />

        <CardContent>
          <Box
            sx={{
              height: 60,
              overflow: "hidden",
              marginBottom: "3px",
              textAlign: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                display: "inline",
                height: 55,
                fontSize: "18px",
                lineHeight: "90%",
                fontWeight: "bold",
                justifyContent: "center",
                fontFamily: "Roboto Condensed",
                color: "#051f2e",
                whiteSpace: 'normal'
              }}
            >
              {props.project.name}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: 90, overflow: "hidden", textOverflow: "ellipsis", marginTop: "5%" }}
          >
            {shortenedDescription()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box
          sx={{
            display: "flex",
            alignItems: 'flex-end',
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              alignSelf: "left",
              fontFamily: "Roboto Condensed",
              color: "#051f2e",
              fontWeight: "bold",
            }}
          >
            {" "}
            Goal: ${usdVals.fundraisingGoal}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={usdVals.percentReached > 100 ? 100 : usdVals.percentReached}
            sx={{ width: 120, alignSelf: "center" }}
          />
          <Typography
            sx={{
              alignSelf: "right",
              fontFamily: "Roboto Condensed",
              color: "#051f2e",
            }}
          >
            {usdVals.percentReached > 100 ? 100 : usdVals.percentReached}%
          </Typography>
        </Box>

      </CardActions>
    </Card>
  );
}

const mapState = (state) => {
  return {
    conversion: state.conversion,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchConversion: () => dispatch(fetchConversion()),
  };
};

export default connect(mapState, mapDispatch)(ProjectCard);
