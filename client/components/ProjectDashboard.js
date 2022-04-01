import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Link,
  Divider,
  Paper,
  LinearProgress,
} from '@mui/material';
import { connect } from 'react-redux';
import { updateProject, fetchProject } from '../store/singleProject';
import { useParams } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { YouTubeAlert, ImageAlert } from './smallComponents/InfoAlerts';
import NoProjectsToViewPage from './NoProjectsToViewPage';
import { projectToUSD } from './smallComponents/utilities';
import { fetchConversion } from '../store/conversion';
import { loadWeb3, loadContractData } from '../web3/web3';
import AccessForbiddenPage from './AccessForbiddenPage';

const ProjectDashboard = (props) => {
  let params = useParams();
  let id = parseInt(params.id);

  // let scientistsUserId = [];
  // props.scientists.forEach((scientist) =>
  //   scientistsUserId.push(scientist.userId)
  // );

  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    imageUrl: '',
    videoUrl: '',
    project_timeline_start: '',
    project_timeline_end: '',
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const [account, setAccount] = useState('');
  const [youtubeAlert, setyoutubeAlert] = useState(false);
  const [imageAlert, setImageAlert] = useState(false);

  const fetchData = async () => {
    try {
      await props.fetchProject(id);
      const accountAddress = await loadWeb3();
      if (accountAddress) setAccount(accountAddress[0]);
      if (props.project) {
        await setForm({
          id: id,
          name: props.project.name,
          description: props.project.description,
          imageUrl: props.project.imageUrl,
          videoUrl: props.project.videoUrl,
          project_timeline_start: props.project.project_timeline_start,
          project_timeline_end: props.project.project_timeline_end,
        });
      }
      await props.fetchConversion();
      setIsUpdated(false);
    } catch (error) {
      console.error('error in fetchData', error);
    }
  };

  console.log('PROJECT TO CONVERT', props.project);
  let results = projectToUSD(props.project, props.conversion);
  console.log(results);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [isUpdated]);

  const handleClose = () => {
    setyoutubeAlert(false);
    setImageAlert(false);
  };
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.type === 'date') {
      value = Date.parse(value);
      // add some time to offset from GMT
      value = (new Date(value + (3600000*4) ))
    }
    if (e.target.id === 'videoUrl')
      value = 'https://www.youtube.com/embed/' + value;
    setForm({ ...form, [e.target.id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateProject(form);
    setIsUpdated(true);
  };
  const handleReleaseFunds = async () => {
    try {
      const campaignContract = await loadContractData(
        props.project.campaign_contract_address
      );
      console.log('contract', campaignContract);
      await campaignContract.methods
        .releaseFund()
        .send({ from: props.project.project_wallet_address });
    } catch (error) {
      console.error('error in release funds', error);
    }
  };

  if (!props.project.name) {
    return (
      <div>
        <NoProjectsToViewPage />
      </div>
    );
  }

  return (
    <>
      {/* {scientistsUserId.includes(props.auth.id) ? ( */}
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginBottom: '200px',
          }}
        >
          <Grid
            item
            xs={12}
            sx={{ marginTop: '10%', marginBottom: '5%' }}
            textAlign="center"
          >
            <Typography
              variant="h2"
              color="#051f2e"
              sx={{ fontFamily: 'Roboto Condensed', fontSize: '50px' }}
            >
              Project Dashboard
            </Typography>
          </Grid>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid item xs={1} />
            <Grid item xs={12} style={{ maxWidth: '400px' }}>
              <Grid
                container
                // spacing={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  // background: "#051f2e",
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    fullwidth="true"
                    required
                    id="name"
                    label="Project Name"
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    defaultValue={props.project.name}
                    inputProps={{ maxLength: 90 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullwidth="true"
                    id="description"
                    label="Project Description"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    defaultValue={props.project.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="imageUrl"
                    label="Image URL"
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    defaultValue={props.project.imageUrl}
                  />
                  <Button>
                    <InfoOutlinedIcon onClick={() => setImageAlert(true)} />
                  </Button>
                  <ImageAlert handleClose={handleClose} open={imageAlert} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="videoUrl"
                    label="YouTube Video ID"
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    defaultValue={props.project.videoUrl}
                  />
                  <Button>
                    <InfoOutlinedIcon onClick={() => setyoutubeAlert(true)} />
                  </Button>
                  <YouTubeAlert handleClose={handleClose} open={youtubeAlert} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="date"
                    id="project_timeline_start"
                    label="Project Start Date"
                    defaultValue={
                      new Date(props.project.project_timeline_start)
                    }
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="date"
                    id="project_timeline_end"
                    label="Project End Date"
                    defaultValue={new Date(props.project.project_timeline_end)}
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} marginBottom="50px"></Grid>
              <Grid
                container
                spacing={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // background: "#051f2e",
                }}
              >
                <Grid item xs={4}>
                  <Button
                    fullwidth="true"
                    type="submit"
                    sx={{ marginBottom: '10%' }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12} style={{ maxWidth: '600px' }}>
            <Grid
              container
              // spacing={2}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                // background: "#051f2e",
              }}
            >
              <Grid item xs={12} align="flex-start">
                <Card sx={{ maxWidth: 600 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={props.project.imageUrl}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      color="#051f2e"
                      sx={{ fontFamily: 'Roboto Condensed', fontSize: '20px' }}
                    >
                      {props.project.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontFamily: 'Roboto Condensed' }}
                    >
                      {props.project.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontFamily: 'Roboto Condensed' }}
                    >
                      Project Start Date:{' '}
                      {new Date(
                        props.project.project_timeline_start
                      ).toDateString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontFamily: 'Roboto Condensed' }}
                    >
                      Project End Date:{' '}
                      {new Date(
                        props.project.project_timeline_end
                      ).toDateString()}
                    </Typography>

                    <Typography
                      variant="body2"
                      component="div"
                      color="text.secondary"
                      sx={{ fontFamily: 'Roboto Condensed' }}
                    >
                      {' '}
                      Funding Goal Met:{' '}
                      {props.project.reachedGoal
                        ? 'Yes'
                        : `Not yet, ${
                            100 - results.percentReached
                          }% left to go`}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '100%',
                        alignItems: 'center',
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={
                          results.percentReached > 100
                            ? 100
                            : results.percentReached
                        }
                        sx={{ width: 120, alignSelf: 'center'}}
                      />
                      <Typography
                        sx={{
                          alignSelf: 'right',
                          fontFamily: 'Roboto Condensed',
                          color: '#051f2e',
                          marginLeft: '8px',
                        }}
                      >
                        {results.percentReached > 100
                          ? 100
                          : results.percentReached}
                        %
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={props.project.videoUrl}>
                      Video Link
                    </Button>
                    {props.project.reachedGoal ? (
                      <Button size="small" onClick={handleReleaseFunds}>
                        Release Funds
                      </Button>
                    ) : (
                      ''
                    )}
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      {/* ) : (
        <AccessForbiddenPage />
      )} */}
    </>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
    project: state.project.project,
    scientists: state.project.scientists,
    conversion: state.conversion,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateProject: (project) => dispatch(updateProject(project)),
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
    fetchConversion: () => dispatch(fetchConversion()),
  };
};

export default connect(mapState, mapDispatch)(ProjectDashboard);
