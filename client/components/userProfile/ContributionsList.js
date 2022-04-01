import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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
  Alert,
  AlertTitle,
  Grid,
} from "@mui/material";
import { spacing } from "@mui/system";
import { Link } from "react-router-dom";
import { fetchContributionsByUser } from "../../store/contributions";
import { loadWeb3, loadContractData } from "../../web3/web3";

const ContributionsList = (props) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [account, setAccount] = useState("");

  const fetchData = async () => {
    try {
      await props.fetchContributionsByUser(props.user.id);
      const accountAddress = await loadWeb3();
      if (accountAddress) setAccount(accountAddress[0]);
      setIsUpdated(false);
    } catch (error) {
      console.error(
        "error in fetchData from userProfile/ContributionsList",
        error
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [isUpdated]);

  const handleRefund = async (project) => {
    try {
      const campaignContract = await loadContractData(
        project.campaign_contract_address
      );
      await campaignContract.methods
        .refund(props.auth.id)
        .send({ from: account });
    } catch (error) {
      console.error("error in refund", error);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Grid item xs={12} textAlign="left">
        <Typography
          variant="h4"
          color="primary.dark"
          sx={{ fontFamily: "Roboto Condensed" }}
        >
          Projects I contributed{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ maxWidth: "1000px" }}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          spacing={2}
        >
          {props.contributions.map((contribution) => {
            const project = contribution.project;
            console.log("this is project in map......", project);
            const shortenedDescription = () => {
              if (project.description.length > 150) {
                return project.description.slice(0, 150).concat("...");
              } else {
                return project.description;
              }
            };
            return (
              <Grid key={contribution.id} item xs={12} md={6}>
                <Card sx={{ maxWidth: 500 }} variant="outlined">
                  <CardActionArea
                    component={Link}
                    to={`/projects/${project.id}`}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={project.imageUrl}
                    />

                    <CardContent>
                      <Box
                        sx={{
                          height: 40,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        <Typography gutterBottom variant="h6" component="div">
                          {project.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          height: 90,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {shortenedDescription()}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* for releasing funds after campaign has failed */}
                  {!project.isFunded &&
                  props.auth.password === props.user.password ? (
                    <CardActions className="refund–button-and-alert">
                      <Alert severity="info" sx={{ mx: 0.5 }}>
                        {" "}
                        Campaign was unsuccessful -{" "}
                        <strong>click below to release donation</strong>
                      </Alert>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ m: 2 }}
                        onClick={() => handleRefund(project)}
                      >
                        Release Donation
                      </Button>
                    </CardActions>
                  ) : null}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapState = (state) => {
  return {
    contributions: state.contributions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchContributionsByUser: (userId) =>
      dispatch(fetchContributionsByUser(userId)),
  };
};

export default connect(mapState, mapDispatch)(ContributionsList);
