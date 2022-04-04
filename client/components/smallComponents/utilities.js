import React from "react";
import {
  Biotech,
  Functions,
  Spa,
  DirectionsWalk,
  Computer,
  Psychology,
  FactCheck,
  School,
  Science,
  Cyclone,
  SettingsSuggest,
  People,
  Healing,
  Brush,
  BackupTable,
  Public,
  EmojiObjects,
  AccountBalance,
  Android,
} from "@mui/icons-material";


//convert from unix to iso
export const convertDate = (date) => {
    return new Date(date).toString().slice(4,16)
}

export const formatIsoToUnix = (isoStr) => {
  const date = new Date(isoStr).getTime();
  return date;
};

export const projectToUSD = (project, conversion) => {
  return {
      fundraisingGoal: Math.round(
          conversion * (project.fundraising_goal / Math.pow(10, 18))
        ),
      totalDonations: Math.round(
          conversion * (project.totalDonations / Math.pow(10, 18)) * 100
        ) / 100,

      percentReached: Math.floor(
          (project.totalDonations / project.fundraising_goal) * 100
        ),
  }
}

export const weiToUSD = (wei, conversion) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format((wei / Math.pow(10, 18)) * conversion);
};

export const categoriesArr = [
  { name: "All", icon: <FactCheck /> },
  { name: "Biology", icon: <Biotech /> },
  { name: "Ecology", icon: <Spa /> },
  { name: "Mathematics", icon: <Functions /> },
  { name: "Anthropology", icon: <DirectionsWalk /> },
  { name: "Computer Science", icon: <Computer /> },
  { name: "Psychology", icon: <Psychology /> },
  { name: "Education", icon: <School /> },
  { name: "Chemistry", icon: <Science /> },
  { name: "Physics", icon: <Cyclone /> },
  { name: "Paleontology", icon: <Android /> },
  { name: "Engineering", icon: <SettingsSuggest /> },
  { name: "Social Science", icon: <People /> },
  { name: "Medicine", icon: <Healing /> },
  { name: "Art and Design", icon: <Brush /> },
  { name: "Data Science", icon: <BackupTable /> },
  { name: "Earth Science", icon: <Public /> },
  { name: "Neuroscience", icon: <EmojiObjects /> },
  { name: "Political Science", icon: <AccountBalance /> },
];

export const generateColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b},0.8)`;
};
