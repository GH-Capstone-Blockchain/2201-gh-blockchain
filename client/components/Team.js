import React, { useState } from "react";
import { Typography, Grid, Avatar, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Anna Hippee",
    img: "https://media-exp1.licdn.com/dms/image/D4E35AQFuMjtqUTxn8w/profile-framedphoto-shrink_800_800/0/1647565893459?e=1648418400&v=beta&t=RO14PRARUuNv1nyRWTeyaDXGyVgTEjKrjgL05PLrxIM",
    linkedInUrl: "https://www.linkedin.com/in/annahippee/",
  },
  {
    name: "Brooke Wilder",
    img: "https://media-exp1.licdn.com/dms/image/D5635AQHLQtz1tZReww/profile-framedphoto-shrink_800_800/0/1647295681456?e=1648418400&v=beta&t=4d2mSBeOPGp1a7fAK0K3GvKpDXTMSC04PJDb160vInk",
    linkedInUrl: "https://www.linkedin.com/in/bkwilder/",
  },
  {
    name: "Ju Hye Hwoang",
    img: "https://media-exp1.licdn.com/dms/image/D4D35AQG5oUooTjmBig/profile-framedphoto-shrink_800_800/0/1647734337562?e=1648418400&v=beta&t=crsdLDSweteLfyOn63zrDAD8pLeR28IZg1n178fqjU0",
    linkedInUrl: "https://www.linkedin.com/in/juhyehwoang/",
  },
  {
    name: "Vivian Baik",
    img: "https://media-exp1.licdn.com/dms/image/C4D03AQHX2GrTKWlC2Q/profile-displayphoto-shrink_800_800/0/1516787163377?e=1653523200&v=beta&t=tMGxrt7uWK2a5svBDTh-QFu8Nza-cUG_LYLtoIVIenU",
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
    <Grid
      container
      textAlign="center"
      sx={{
        marginTop: "10%",
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
          <Grid item xs={3} sx={{ padding: "10px" }} key={member.name}>
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
          </Grid>
        );
      })}
    </Grid>
  );
}
