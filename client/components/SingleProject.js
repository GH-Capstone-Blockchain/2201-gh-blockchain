import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProject } from '../store/singleProject';
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
} from '@mui/material';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import theme from './StyleTheme';
import {loadWeb3, loadContractData} from '../web3/web3'

const SingleProject = (props) => {
  let params = useParams();
  let id = parseInt(params.id);
  const [campaign, setCampaign] = useState({})
  const [account, setAccount] = useState('')
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.fetchProject(id);
        const accountAddress = await loadWeb3();
        setAccount(accountAddress[0])

      } catch (error) {
        console.error('error in fetchData', error);
      }
    };
    fetchData();
  }, []);

  const handleDonate = async () => {
    const total = window.web3.utils.toWei("0.2", "Ether")
    const  campaignContract = await loadContractData(props.project.campaign_contract_address);
    setCampaign(campaignContract)
    await campaignContract.methods
      .donate(2)
      .send({ from: account, value: total })
      // .on("transactionHash", (hash) => {
      //   this.setState({ loading: false });
      // });
  }



  if (!props.project) {
    return <div>Data is loading...</div>;
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          {/* Project Name */}
          <Typography variant="h4" margin="15px" sx={{ fontWeight: 'bold' }}>
            {props.project.name}
          </Typography>

          {/* Authors (AKA Scientists) */}
          <Typography variant="subtitle1" margin="15px">
            By:{' '}
            {props.scientists.map((scientist, idx) => {
              let firstName =
                scientist.user.firstName[0].toUpperCase() +
                scientist.user.firstName.slice(1);
              let lastName =
                scientist.user.lastName[0].toUpperCase() +
                scientist.user.lastName.slice(1);
              if (idx === props.scientists.length - 1) {
                return `${firstName} ${lastName}`;
              } else {
                return `${firstName} ${lastName}, `;
              }
            })}
          </Typography>
          {/* Hero image */}
          <Box margin="15px" maxWidth="750">
            <img src={props.project.imageUrl} />
          </Box>

          {/* About this project subtitle */}
          <Typography variant="h5" margin="15px" sx={{ fontWeight: 'bold' }}>
            About this project:
          </Typography>

          {/* Project description */}
          <Typography variant="body1" margin="15px" component="h5">
            {props.project.description}
          </Typography>

          {/* Project Start */}
          <Typography
            variant="subtitle2"
            margin="15px"
            sx={{ fontWeight: 'bold' }}
          >
            Project start:{' '}
          </Typography>

          <Typography variant="body1" margin="15px" component="h5">
            {props.project.project_timeline_start}
          </Typography>

          {/* Project End */}
          <Typography
            variant="subtitle2"
            margin="15px"
            sx={{ fontWeight: 'bold' }}
          >
            Project end:{' '}
          </Typography>

          <Typography variant="body1" margin="15px" component="h5">
            {props.project.project_timeline_end}
          </Typography>

          <Card style={{display: 'inline-block'}}>
            <CardContent>
              {/* Progress Label */}
              <Typography
                variant="h5"
                margin="15px"
                sx={{ fontWeight: 'bold' }}
              >
                0% of {props.project.fundraising_goal}
              </Typography>
              

              <Box margin="15px" sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '40%', mr: 1 }}>
                  <LinearProgress variant="determinate" value={0} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{`${Math.round(0)}%`}</Typography>
                </Box>
                <Typography variant="subtitle2" margin="15px">
                  <strong>Campaign Start:</strong>{' '}
                  {props.project.campaign_timeline_start}
                </Typography>
                <Divider></Divider>
                <Typography variant="subtitle2" margin="15px">
                  <strong>Campaign End:</strong>{' '}
                  {props.project.campaign_timeline_end}
                </Typography>
              </Box>
              <Button onClick={handleDonate}>DONATE</Button>
            </CardContent>
          </Card>
          {props.project.videoUrl ? (
            <Box>
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
      </ThemeProvider>
    </div>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
    project: state.project.project,
    scientists: state.project.scientists,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
