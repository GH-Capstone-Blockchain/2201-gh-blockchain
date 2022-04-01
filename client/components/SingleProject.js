import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProject } from "../store/singleProject";
import { fetchContributions, createContribution } from "../store/contributions";
import { fetchConversion } from "../store/conversion";
import { Typography, Box, Container, Grid } from "@mui/material";
import { loadWeb3, loadContractData } from "../web3/web3";
import DonateCard from "./DonateCard";
import {
  SayThankYou,
  NoMetaMaskError,
  ErrorTransactionAlert,
  AddDonationConfirmation
} from "./smallComponents/InfoAlerts";
import ContributionList from "./smallComponents/ContributionsList";
import CategoriesByProject from "./CategoriesByProject";
import AboutProject from "./AboutProject";


const SingleProject = (props) => {
  let params = useParams();
  let id = parseInt(params.id);
  const [campaign, setCampaign] = useState({});
  const [account, setAccount] = useState("");
  const [error, setError] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [donation, setDonation] = useState(0);
  const [noMetamask, setNoMetamask] = useState(false);
  const [blockchainWait, setBlockchainWait] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.fetchProject(id);
        await props.fetchContributions(id);
        const accountAddress = await loadWeb3();
        if (accountAddress) setAccount(accountAddress[0]);
        if (!accountAddress) setNoMetamask(true);
        await props.fetchConversion();
      } catch (error) {
        console.error("error in fetchData", error);
      }
    };
    fetchData();
  }, [thankYou]);

  const handleDonate = async (donation) => {
    try {
      setDonation(donation);
      const eth = donation / props.conversion;
      const total = window.web3.utils.toWei(`${eth}`, "Ether");
      const campaignContract = await loadContractData(
        props.project.campaign_contract_address
      );
      setCampaign(campaignContract);
      setBlockchainWait(true);
      await campaignContract.methods
        .donate(props.auth.id)
        .send({ from: account, value: total });
      await props.createContribution(id, props.auth.id, eth * Math.pow(10, 18));

      setBlockchainWait(false);
      setThankYou(true);
    } catch (error) {
      console.error("error in handleDonate", error);
      setError(true);
    }
    // .on("transactionHash", (hash) => {
    //   this.setState({ loading: false });
    // });
  };

  const handleClose = () => {
    setError(false);
    setThankYou(false);
    setNoMetamask(false);
  };

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
      <ErrorTransactionAlert handleClose={handleClose} open={error} />
      <SayThankYou
        handleClose={handleClose}
        donation={donation}
        open={thankYou}
      />
      <NoMetaMaskError handleClose={handleClose} open={noMetamask} />
      <AddDonationConfirmation open={blockchainWait}/>
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
              return (
                <Link key={idx} to={`/user/${scientist.user.id}`}>
                  {firstName} {lastName}
                </Link>
              );
            } else {
              return (
                <Link key={idx} to={`/user/${scientist.user.id}`}>
                  {firstName} {lastName},{" "}
                </Link>
              );
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
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <img
              style={{
                borderRadius: "10px",
                width: "700px",
                height: "400px",
                objectFit: "cover",
              }}
              src={props.project.imageUrl}
            />
            <CategoriesByProject project={props.project} />
          </Box>

          <DonateCard
            project={props.project}
            conversion={props.conversion}
            loggedIn={props.auth.id}
            submit={thankYou}
            handleDonate={handleDonate}
          />
        </Box>
        <AboutProject project={props.project} />
        {props.project.videoUrl ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "20px" }}
          >
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
        {/* {Contributions List} */}
        <Box>
          <Typography
            margin="15px"
            sx={{
              fontSize: "22px",
              fontFamily: "Roboto Condensed",
              color: "#051f2e",
              fontWeight: "bold",
            }}
          >
            Contributors:{" "}
          </Typography>
          {props.contributions.length ? (
            <ContributionList contributions={props.contributions} />
          ) : (
            <Typography>
              There are no contributions yet! Be the first to make a difference!
            </Typography>
          )}
          <Box sx={{ height: "5em" }}></Box>
        </Box>
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
