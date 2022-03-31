import React, { useState } from "react";
import { Typography, Grid, Avatar, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const teamMembers = [
  {
    name: "Anna Hippee",
    img: "annaH.jpg",
    linkedInUrl: "https://www.linkedin.com/in/annahippee/",
  },
  {
    name: "Brooke Wilder",
    img: "brooke.jpg",
    linkedInUrl: "https://www.linkedin.com/in/bkwilder/",
  },
  {
    name: "Ju Hye Hwoang",
    img: "grace.jpg",
    linkedInUrl: "https://www.linkedin.com/in/juhyehwoang/",
  },
  {
    name: "Vivian Baik",
    img: "vivian.jpg",
    linkedInUrl: "https://www.linkedin.com/in/vivianbaik/",
  },
];

const suffledMember = (teamMembers) => {
  for (let i = teamMembers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = teamMembers[i];
    teamMembers[i] = teamMembers[j];
    teamMembers[j] = temp;
  }
  return teamMembers;
};
export default function Team() {
  return (
    <Fade down delay={200} duration={1000}>
      <Grid
        container
        textAlign="center"
        sx={{
          marginTop: "100px",
          marginBottom: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontFamily: "Roboto Condensed",
              marginBottom: "5%",
            }}
          >
            {" "}
            Meet the Team
          </Typography>
        </Grid>
        {suffledMember(teamMembers).map((member) => {
          return (
            <Grid
              item
              xs={12}
              md={3}
              sx={{ padding: "10px" }}
              key={member.name}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <a href={member.linkedInUrl} target="_blank">
                  <Avatar
                    src={member.img}
                    alt="Remy Sharp"
                    sx={{ width: 200, height: 200 }}
                  />
                </a>
                <Typography
                  varient="h4"
                  sx={{
                    color: "white",
                    fontFamily: "Roboto Condensed",
                    fontSize: "1.5em",
                  }}
                >
                  {member.name}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Fade>
  );
}
