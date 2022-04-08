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
  Chip,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { loadWeb3, loadContractData } from "../../web3/web3";
import { formatIsoToUnix, weiToUSD } from "../smallComponents/utilities";
import {
  FundsTransferWait,
  NoMetaMaskError,
} from "../smallComponents/InfoAlerts";

const ContributionsList = (props) => {
  let params = useParams();
  const [isUpdated, setIsUpdated] = useState(false);
  const [account, setAccount] = useState("");
  const [blockchainWait, setBlockchainWait] = useState(false);
  const [noMetamask, setNoMetamask] = useState(false);

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
    }
  };

  const shortenedDescription = (description) => {
    if (description.length > 150) {
      return description.slice(0, 150).concat("...");
    } else {
      return description;
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
      <FundsTransferWait open={blockchainWait} />
      <NoMetaMaskError handleClose={handleClose} open={noMetamask} />
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
            return props.auth.id !== props.user.id ? (
              // {view for profile page of other users}
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
                        {shortenedDescription(project.description)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ) : (
              // {view for personal profile page}
              <Grid key={contribution.id} item xs={12} md={6}>
                <Card
                  sx={{
                    maxWidth: 500,
                    maxHeight: 500,
                    minHeight: 500,
                    display: "flex",
                    flexDirection: "column",
                  }}
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
                  </CardActionArea>

                  <CardContent
                    sx={{
                      height: "auto",
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      to={`/projects/${project.id}`}
                    >
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
                    </CardActionArea>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        height: 90,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {/* {shortenedDescription(project.description)} */}
                      {project.description}
                    </Typography>

                    <Typography sx={{ py: 1 }}>
                      <strong>Donated:</strong>{" "}
                      {weiToUSD(
                        contribution.contributionAmount,
                        props.conversion
                      )}
                    </Typography>
                  </CardContent>
                  {/* for releasing funds after campaign has failed */}
                  {!project.reachedGoal &&
                  // formatIsoToUnix(project.campaign_timeline_end) < Date.now() &&
                  contribution.refunded === false ? (
                    <CardActions className="refund–button-and-alert">
                      <Alert severity="info" sx={{ mx: 0.5 }}>
                        {" "}
                        Campaign was unsuccessful -{" "}
                        <strong>click below to refund donation</strong>
                      </Alert>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ m: 2 }}
                        onClick={() => handleRefund(project, contribution.id)}
                      >
                        Request Refund
                      </Button>
                    </CardActions>
                  ) : null}
                  {contribution.refunded === true ? (
                    <Alert
                      severity="info"
                      sx={{ m: 1, position: "relative", bottom: 0 }}
                    >
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
