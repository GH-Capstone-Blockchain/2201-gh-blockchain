import React, {useEffect, useState} from 'react'
import {loadWeb3} from '../web3/web3'
import Campaign from '../../build/contracts/Campaign.json'
import Web3 from "web3";

export default function TestingPage(props) {
    const [address, setAddress] = useState(null)
    useEffect(async () => {
     let add = await loadWeb3();
     setAddress(add[0])
    }, [])
   
    const onClick = async (event) => {
        const web3 = window.web3
       const newCampaign = new web3.eth.Contract(Campaign.abi)
       const response = await newCampaign.deploy({data: Campaign.bytecode, arguments: [12, 12, '0xE95cA38960D5509Eb8b0752a025928B495d6c701', 'TITLE OF PROJECT', 399, 123456, 123457]}).send({from:'0xE95cA38960D5509Eb8b0752a025928B495d6c701'})
       
       // uint _campaignId, uint _scientistId, address _projectAddress, string memory _title, uint _goalAmount, uint256 _startDate, uint256 _endDate
    }
    return(
        <div>
            <button onClick={onClick}>Test!</button>
            <div>{address}</div>
        </div>
    )
}