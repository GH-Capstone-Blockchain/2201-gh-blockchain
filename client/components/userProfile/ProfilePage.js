import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../store/user";
import { Link, useParams } from "react-router-dom";
import CredsAndPubs from "./CredsAndPubs";
import ProjectsList from "./ProjectsList";
import ContributionsList from "./ContributionsList";
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

const ProfilePage = (props) => {
  let params = useParams();
  const id = parseInt(params.id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    await props.fetchUser(id);
    setIsLoading(false);
  }, []);
  if (isLoading) return <img src={"https://i.stack.imgur.com/ATB3o.gif"} />;

  const capitalizeName = (user) => {
    user.firstName =
      user.firstName.charAt(0).toUpperCase() +
      user.firstName.slice(1).toLowerCase();
    user.lastName =
      user.lastName.charAt(0).toUpperCase() +
      user.lastName.slice(1).toLowerCase();
    return user.firstName + " " + user.lastName;
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{ marginTop: "130px", marginBottom: "30px" }}
        textAlign="center"
      >
        <Typography
          variant="h2"
          color="#051f2e"
          sx={{ fontFamily: "Roboto Condensed", fontSize: "50px" }}
        >
          {props.user.username}'s Profile
        </Typography>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={10} style={{ maxWidth: "800px" }}>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <Grid
            item
            xs={4}
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            textAlign="center"
          >
            <Card id="pic-name">
              <img
                src={props.user.profileImg}
                alt="profile picture"
                width="300px"
              />
              <h3>{props.user.username}</h3>
            </Card>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            textAlign="left"
          >
            <Card id="user-info">
              <Typography>Name: {capitalizeName(props.user)}</Typography>
              <Typography>Email: {props.user.email}</Typography>
              <Typography>Gender: {props.user.gender}</Typography>
              <Typography>Race: {props.user.race}</Typography>
              <Typography>Birth Year: {props.user.birthYear}</Typography>
              <Typography>Bio: {props.user.bio}</Typography>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} />

      {props.user.scientist ? (
        <>
          <Grid item xs={1} />
          <Grid item xs={10} style={{ maxWidth: "800px" }}>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Grid item xs={12}>
                <CredsAndPubs auth={props.auth} user={props.user} />
                <ProjectsList auth={props.auth} user={props.user} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} />
        </>
      ) : (
        <Grid item xs={12}>
          <ContributionsList auth={props.auth} user={props.user} />
        </Grid>
      )}
      {props.auth.password === props.user.password ? (
        <Link to={`/`}>
          <Button variant="contained">Edit Account Info</Button>
        </Link>
      ) : null}
    </Grid>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
  };
};

export default connect(mapState, mapDispatch)(ProfilePage);
