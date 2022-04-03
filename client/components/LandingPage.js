import React, { useEffect, useState } from "react";
import ParticlesComp from "./Particles";
import Featured from "./Featured";
import { connect } from "react-redux";
import { fetchProjects } from "../store/projects";
import Header from "./Header";
import Reasons from "./Reasons";
import ProjectsStats from "./ProjectsStats";
import Team from "./Team";
import EasySteps from "./EasySteps";

//style
import { Grid } from "@mui/material";

function LandingPage(props) {
  useEffect(async () => {
    try {
      await props.fetchProjects();
    } catch (error) {
      console.error("error in fetchData", error);
    }
  }, []);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12}>
        <ParticlesComp />
      </Grid>
      <Header />
      <Grid item xs={1}></Grid>
      <Grid item xs={10} style={{ maxWidth: "1000px" }}>
        <ProjectsStats />
        <Featured projects={props.projects} />
        <EasySteps />
        <Reasons />
        <Team />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

const mapState = (state) => {
  return {
    projects: state.projects,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapState, mapDispatch)(LandingPage);
