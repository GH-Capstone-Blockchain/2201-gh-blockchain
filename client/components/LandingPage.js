import React, { useEffect, useState } from "react";
import ParticlesComp from "./Particles";
import Featured from "./Featured";
import { connect } from "react-redux";
import { fetchProjects } from "../store/projects";
import Header from "./Header";
import Reasons from "./Reasons";
import ProjectsStats from "./ProjectsStats";
import Team from "./Team";

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
        // padding: "10%",
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
        <Reasons />
        <Team />
      </Grid>
      <Grid item xs={1}></Grid>

      {/* <Grid container>
        <section id="carousel">
          <div id="carousel-text">
            <h1>Aviatto: Traveling for a better world</h1>
            <h2>Learn More</h2>
          </div>
          <img class="main-image" src="landing-page-background2.png" />
        </section>
        <Grid
          item
          xs={12}
          style={
            {
              background: `url(/landing-page-background2.png)`,
              backgroundSize: "cover",
              minWidth: "100vw",
              minHeight: "100vh",
              height: "50%",
              position: "absolute",
              zIndex: "3",
              top: "0",
              left: "0",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }
          }
        >
          <Typography>
            Decentralized Funding Platform for Scientific Research
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Featured projects={props.projects} />
        </Grid>
      </Grid> */}
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