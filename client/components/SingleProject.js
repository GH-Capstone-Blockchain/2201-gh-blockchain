import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { convertDate } from "./smallComponents/utilities";
import { fetchProject } from "../store/singleProject";
import { fetchContributions, createContribution } from "../store/contributions";
import { fetchConversion } from "../store/conversion";
import {
  Typography,
  Box,
  Container,
  Paper,
  ThemeProvider,
  Card,
  CardContent,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import theme from "./StyleTheme";
import { loadWeb3, loadContractData } from "../web3/web3";
import DonateCard from "./DonateCard";
import { ErrorTransactionAlert } from "./smallComponents/InfoAlerts";

const SingleProject = (props) => {
  let params = useParams();
  let id = parseInt(params.id);
  const [campaign, setCampaign] = useState({});
  const [account, setAccount] = useState("");
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.fetchProject(id);
        await props.fetchContributions(id);
        const accountAddress = await loadWeb3();
        setAccount(accountAddress[0]);
        await props.fetchConversion();
      } catch (error) {
        console.error("error in fetchData", error);
      }
    };
    fetchData();
  }, []);

  const handleDonate = async (donation) => {
    try {
      const eth = donation / props.conversion
      const total = window.web3.utils.toWei(`${eth}`, "Ether");
      console.log(total)
      const campaignContract = await loadContractData(
        props.project.campaign_contract_address
      );
      setCampaign(campaignContract);
      await campaignContract.methods
        .donate(props.auth.id)
        .send({ from: account, value: total });
      // Had to hardcode in 100 because the wei amount creates sequelize errors (too big of integer -- need to address this);
      await props.createContribution(id, props.auth.id, eth * Math.pow(10,18));
    } catch (error) {
      console.error("error in handleDonate", error);
      setError(true);
    }
    // .on("transactionHash", (hash) => {
    //   this.setState({ loading: false });
    // });
  };

  
  const handleClose = () => {
    setError(false)
  }

  if (!props.project) {
    return <div>Data is loading...</div>;
  }
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
      <Grid item xs={12} sx={{ display: "flex", margin: "4%" }}></Grid>
      <ErrorTransactionAlert handleClose={handleClose} open={error}/>
      <Container
        sx={{ display: "flex", flexDirection: "column" }}
        maxWidth="lg"
      >
        {/* Project Name */}
        <Typography
          variant="h4"
          margin="15px"
          sx={{
            fontFamily: "Roboto Condensed",
            color: "#051f2e",
            fontWeight: "bold",
          }}
        >
          {props.project.name}
        </Typography>

        {/* Authors (AKA Scientists) */}
        <Typography variant="subtitle1" margin="15px" sx={{ color: "#051f2e" }}>
          By:{" "}
          {props.scientists.map((scientist, idx) => {
            let firstName = scientist.user.firstName;
            let lastName = scientist.user.lastName;
            if (idx === props.scientists.length - 1) {
              return `${firstName} ${lastName}`;
            } else {
              return `${firstName} ${lastName}, `;
            }
          })}
        </Typography>
        {/* Hero image */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
            alignItems: "center",
          }}
          margin="15px"
          maxWidth="750"
        >
          <img style={{'borderRadius' : "10px", "width":'700px', "height":'400px', 'objectFit': 'cover'} }src={props.project.imageUrl} />
          <DonateCard
            project={props.project}
            conversion={props.conversion}
            loggedIn = {props.auth.id}
            handleDonate={handleDonate}
          />
        </Box>
        {/* About this project subtitle */}
        <Typography
          variant="h5"
          margin="15px"
          sx={{
            fontSize: "30px",
            fontFamily: "Roboto Condensed",
            color: "#051f2e",
            fontWeight: "bold",
          }}
        >
          About this project:
        </Typography>

        {/* Project Timeline */}
        <Box sx={{display:'flex', flexDirection:'row'}}>
        <Typography
          variant="subtitle2"
          margin="15px"
          sx={{ fontWeight: "bold" }}
        >
          Project Timeline:{" "}
        </Typography>
        <Typography variant="body1" margin="15px" component="h5">
          {props.project
            ? convertDate(props.project.project_timeline_start)
            : ""} to {props.project ? convertDate(props.project.project_timeline_end) : ""}
        </Typography>  
        </Box>
                {/* Project description */}
                <Typography variant="body1" margin="15px" component="h5">
          {props.project.description}
        </Typography>
        {props.project.videoUrl ? (
          <Box sx={{display:'flex', justifyContent:'center', margin:'20px'}}>
            <iframe
              width="854"
              height="480"
              src={props.project.videoUrl}
              title="YouTube video player"
            ></iframe>
          </Box>
        ) : (
          <div></div>
        )}
      </Container>
    </Grid>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
    project: state.project.project,
    scientists: state.project.scientists,
    contributions: state.contributions,
    conversion: state.conversion,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
    fetchContributions: (projectId) => dispatch(fetchContributions(projectId)),
    createContribution: (projectId, userId, contributionAmt) =>
      dispatch(createContribution(projectId, userId, contributionAmt)),
    fetchConversion: () => dispatch(fetchConversion()),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
