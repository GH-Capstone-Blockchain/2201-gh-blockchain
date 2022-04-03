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
  AddDonationConfirmation,
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
        marginTop: "40px",
      }}
    >
      <Grid item xs={12} sx={{ display: "flex", margin: "10px" }}></Grid>
      <ErrorTransactionAlert handleClose={handleClose} open={error} />
      <SayThankYou
        handleClose={handleClose}
        donation={donation}
        open={thankYou}
      />
      <NoMetaMaskError handleClose={handleClose} open={noMetamask} />
      <AddDonationConfirmation open={blockchainWait} />
      <Grid item xs={12} md={10} style={{ maxWidth: "1000px" }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          {/* Project Name */}
          <Grid item xs={12} align="left">
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#051f2e",
                fontWeight: "bold",
              }}
            >
              {props.project.name}
            </Typography>
          </Grid>

          {/* Authors (AKA Scientists) */}
          <Grid item xs={12} align="left">
            <Typography>
              By:{" "}
              {props.scientists.map((scientist, idx) => {
                let firstName = scientist.user.firstName;
                let lastName = scientist.user.lastName;
                if (idx === props.scientists.length - 1) {
                  return (
                    <Link
                      className="link-scientist"
                      key={idx}
                      to={`/user/${scientist.user.id}`}
                    >
                      {firstName} {lastName}
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      className="link-scientist"
                      key={idx}
                      to={`/user/${scientist.user.id}`}
                    >
                      {firstName} {lastName},{" "}
                    </Link>
                  );
                }
              })}
            </Typography>
          </Grid>

          {/* Hero image */}
          <Grid item xs={12} md={7}>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Grid item xs={12}>
                <img
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={props.project.imageUrl}
                />
              </Grid>
              <Grid item xs={12}>
                <CategoriesByProject project={props.project} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <DonateCard
              project={props.project}
              conversion={props.conversion}
              loggedIn={props.auth.id}
              submit={thankYou}
              handleDonate={handleDonate}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <AboutProject project={props.project} />
              </Grid>
              <Grid item xs={12} md={5}>
                <Grid container>
                  <Typography
                    sx={{
                      marginTop: "30px",
                      fontSize: "30px",
                      fontFamily: "Roboto Condensed",
                      color: "#5babab",
                      fontWeight: "bold",
                    }}
                  >
                    Contributors:{" "}
                  </Typography>
                  {props.contributions.length ? (
                    <ContributionList contributions={props.contributions} />
                  ) : (
                    <Typography>
                      There are no contributions yet! Be the first to make a
                      difference!
                    </Typography>
                  )}
                  <Box sx={{ height: "5em" }}></Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} marginBottom="100px">
            {props.project.videoUrl ? (
              <div className="container-iframe">
                <iframe
                  className="responsive-iframe"
                  src={props.project.videoUrl}
                  title="YouTube video player"
                ></iframe>
              </div>
            ) : (
              <div></div>
            )}
          </Grid>

          {/* {Contributions List} */}
        </Grid>
      </Grid>
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
