import axios from 'axios' 


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