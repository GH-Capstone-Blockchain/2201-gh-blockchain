import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../store/user";
import { fetchProjectsByScientist } from "../../store/projects";
import { Link, useParams } from "react-router-dom";
import CredsAndPubs from "./CredsAndPubs";
import ProjectsList from "./ProjectsList";
import ContributionsList from "./ContributionsList";
import {
  Typography,
  Paper,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Avatar,
  Box,
} from "@mui/material";

const ProfilePage = (props) => {
  let params = useParams();
  const id = parseInt(params.id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    await props.fetchUser(id);
    await props.fetchProjectsByScientist(id);

    setIsLoading(false);
  }, [params]);
  

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
        marginBottom: "100px",
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
          sx={{ fontFamily: "Roboto Condensed" }}
        >
          {props.user.username}'s Profile
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ maxWidth: "800px" }}>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            textAlign="center"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                src={props.user.profileImg}
                alt="Remy Sharp"
                sx={{ width: 200, height: 200 }}
              />
              <Typography
                varient="h4"
                color="primary.dark"
                sx={{
                  fontFamily: "Roboto Condensed",
                  fontSize: "1.5em",
                }}
              >
                {props.user.username}
              </Typography>
              {props.auth.password === props.user.password ? (
                <Link to={`/`}>
                  <Button variant="contained">Edit</Button>
                </Link>
              ) : null}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            textAlign="left"
          >
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableBody>
                  <TableRow>
                    <TableCell>Name:</TableCell>
                    <TableCell>
                      {props.user.firstName && props.user.lastName
                        ? capitalizeName(props.user)
                        : null}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email:</TableCell>
                    <TableCell>{props.user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gender:</TableCell>
                    <TableCell>{props.user.gender}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Race:</TableCell>
                    <TableCell>{props.user.race}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Birth Year:</TableCell>
                    <TableCell>{props.user.birthYear}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bio:</TableCell>
                    <TableCell>{props.user.bio}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {props.user.scientist ? (
          <>
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
                <ProjectsList
                  auth={props.auth}
                  user={props.user}
                  projects={props.projects}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <ContributionsList auth={props.auth} user={props.user} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
    user: state.user,
    projects: state.projects,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    fetchProjectsByScientist: (userId) =>
      dispatch(fetchProjectsByScientist(userId)),
  };
};

export default connect(mapState, mapDispatch)(ProfilePage);
