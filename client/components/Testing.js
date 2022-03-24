import React, {useEffect} from 'react'
import loadWeb3 from '../web3'
import Campaign from '../../build/contracts/Campaign.json'
import Web3 from "web3";

export default function TestingPage(props) {
    useEffect(() => {
        loadWeb3();
    }, [])

    const onClick = async (event) => {
        const web3 = window.web3
       const newCampaign = new web3.eth.Contract(Campaign.abi)
       const response = await newCampaign.deploy({data: Campaign.bytecode, arguments: [12, 12, '0xED747cc62Cf9f04bE9C04094BC881877F4c22234', 'TITLE OF PROJECT', 399, 123456, 123457]}).send({from:'0xED747cc62Cf9f04bE9C04094BC881877F4c22234'})
       console.log(response)
       // uint _campaignId, uint _scientistId, address _projectAddress, string memory _title, uint _goalAmount, uint256 _startDate, uint256 _endDate
    }
    return(
        <div>
            <button onClick={onClick}>Test!</button>
        </div>
    )
}