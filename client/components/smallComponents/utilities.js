import axios from 'axios' 
import React from 'react'
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
  Android
} from "@mui/icons-material";



export const convertDate = (date) => {
    return new Date(date).toString().slice(4,16)
}


// export const projectToUSD = async (project) => {
//     try {
//         const {data} = await axios.get("https://api.coinbase.com/v2/exchange-rates?currency=ETH")
//         const conversion = data.data.rates.USD
//         console.log(conversion)
//         return {
//             fundraisingGoal: Math.round(
//                 conversion * (project.fundraising_goal / Math.pow(10, 18))
//               ),
//             totalDonations: Math.round(
//                 conversion * (project.totalDonations / Math.pow(10, 18)) * 100
//               ) / 100,
    
//             percentReached: Math.floor(
//                 (project.totalDonations / project.fundraising_goal) * 100
//               ),
//         }
//     } catch (error) {
//         console.log('error in projectToUSD utility function', error)
//     }
// }
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


// export const weiToUSD = async (wei) => {
//     try {
//         const {data} = await axios.get("https://api.coinbase.com/v2/exchange-rates?currency=ETH")
//         const conversion = data.data.rates.USD
//         return (wei / Math.pow(10, 18)) * conversion
//     } catch (error) {
//         console.log('error in weiToUSD utility function', error)
//     }
// }
export const weiToUSD = (wei, conversion) => {
        return (wei / Math.pow(10, 18)) * conversion
}

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
  { name: "Engineering", icon: <SettingsSuggest/> },
  { name: "Social Science", icon: <People /> },
  { name: "Medicine", icon: <Healing /> },
  { name: "Art and Design", icon: <Brush /> },
  { name: "Data Science", icon: <BackupTable /> },
  { name: "Earth Science", icon: <Public /> },
  { name: "Neuroscience", icon: <EmojiObjects /> },
  { name: "Political Science", icon: <AccountBalance /> },
];