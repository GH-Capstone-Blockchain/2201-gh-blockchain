import React, { useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchConversion } from "../store/conversion";
import { connect } from "react-redux";


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
  const goal = Math.round(props.conversion * project.fundraising_goal);
  const contributions =
    Math.round(props.conversion * project.totalDonations * 100) / 100;
  const percent = Math.floor((contributions / goal) * 100);
  console.log(contributions, percent);
  return (
    <Card sx={{ maxWidth: 500 }} variant="outlined">
      <CardActionArea component={Link} to={`/projects/${project.id}`}>
        <CardMedia component="img" height="140" image={project.imageUrl} />

        <CardContent>
          <Box
            sx={{
              height: 55,
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
              }}
            >
              {props.project.name}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: 90, overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {shortenedDescription()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box
          sx={{
            display: "flex",
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
            }}
          >
            {percent > 100 ? 100 : percent}%
          </Typography>
        </Box>

        {/* <Button size="small" color="primary">
          +Donate
        </Button> */}
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
