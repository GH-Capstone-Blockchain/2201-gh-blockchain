import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Alert,
  Grid,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { loadWeb3, loadContractData } from "../../web3/web3";
import { formatIsoToUnix, weiToUSD } from "../smallComponents/utilities";
import {
  FundsTransferWait,
  PleaseCheckYourAccount,
  NoMetaMaskError,
} from "../smallComponents/InfoAlerts";

const ContributionsList = (props) => {
  let params = useParams();
  const [isUpdated, setIsUpdated] = useState(false);
  const [account, setAccount] = useState("");
  const [blockchainWait, setBlockchainWait] = useState(false);
  const [noMetamask, setNoMetamask] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const accountAddress = await loadWeb3();
      if (accountAddress) setAccount(accountAddress[0]);
      if (!accountAddress) setNoMetamask(true);
      await props.fetchConversion();
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
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [isUpdated]);

  const handleClose = () => {
    setNoMetamask(false);
    setError(false);
  };

  const handleRefund = async (project, contributionId) => {
    try {
      const campaignContract = await loadContractData(
        project.campaign_contract_address
      );

      setBlockchainWait(true);
      await campaignContract.methods
        .refund(props.auth.id)
        .send({ from: account });
      await props.refund(props.auth.id, contributionId);
      setBlockchainWait(false);
    } catch (error) {
      console.error("error in handleRefund", error);
      setError(true);
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
      {/* <FundsTransferWait open={blockchainWait} />
      <PleaseCheckYourAccount handleClose={handleClose} open={error} />
      <NoMetaMaskError handleClose={handleClose} open={noMetamask} /> */}
      <Grid item xs={12} textAlign="left">
        <Typography
          variant="h4"
          color="primary.dark"
          sx={{ fontFamily: "Roboto Condensed" }}
        >
          Projects I supported{" "}
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
            const shortenedDescription = () => {
              if (project.description.length > 150) {
                return project.description.slice(0, 150).concat("...");
              } else {
                return project.description;
              }
            };
            return (
              <Grid key={contribution.id} item xs={12} md={6}>
                <Card
                  sx={{ maxWidth: 500, maxHeight: 450, minHeight: 450 }}
                  variant="outlined"
                >
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
                      {props.auth.id === props.user.id ? (
                        <Typography>
                          Donated: {weiToUSD(contribution.contributionAmount, props.conversion)}
                        </Typography>
                      ) : null}
                    </CardContent>
                  </CardActionArea>
                  {/* for releasing funds after campaign has failed */}
                  {!project.reachedGoal &&
                  props.auth.id === props.user.id &&
                  formatIsoToUnix(project.campaign_timeline_end) < Date.now() &&
                  contribution.refunded === false ? (
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
                        onClick={() => handleRefund(project, contribution.id)}
                      >
                        Release Donation
                      </Button>
                    </CardActions>
                  ) : null}
                  {contribution.refunded === true &&
                  props.auth.id === props.user.id ? (
                    <Alert severity="info" sx={{ m: 1 }}>
                      Your donation has been returned to your wallet.
                    </Alert>
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

export default ContributionsList;
