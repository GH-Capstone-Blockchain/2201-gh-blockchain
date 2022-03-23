// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
// contract CampaignFactory{
//     address[] public deployedCampaigns;
//     function createCampaign(uint campaignId, uint scientistId, string title, uint goal, uint endDate) public {
//         address campaignAddress = new Campaign(campaignId, scientistId, title, goal, endDate, msg.sender); //creates and deploys a new contract
//         deployedCampaigns.push(campaignAddress);
//     }
//     function getDeployedCampaigns() public view returns (address[] memory){
//         return deployedCampaigns;
//     }
// }
contract Campaign {
    enum State {AWAITING_DONATIONS, CAMPAIGN_DATE_PASSED, AWAITING_FUND_WITHDRAWAL, CAMPAIGN_COMPLETE}
    //add start date
    uint public campaignId;
    uint public scientistId;
    address public projectAddress;
    string public title;
    uint public goalAmount;
    uint256 public startDate;
    uint256 public endDate;
    uint public currentTotalDonations;
    Donation[] public donationsList;
    struct Donation {
        // address supporterAddress;
        uint supporterId;
        uint donationAmount;
    }
    constructor(uint _campaignId, uint _scientistId, address _projectAddress, string memory _title, uint _goalAmount, uint256 _startDate, uint256 _endDate) {
        campaignId = _campaignId;
        scientistId = _scientistId;
        projectAddress = _projectAddress;
        title = _title;
        goalAmount = _goalAmount;
        startDate = _startDate;
        endDate = _endDate;
    }
    //donors can donate to the campaign
    function donate(uint _supporterId) public payable {
        require(block.timestamp >= startDate, “not started”);
        require(block.timestamp <= endDate, “ended”);
        Donation memory newDonation = Donation(
            {
                supporterId: _supporterId,
                donationAmount: msg.value
            }
        );
        donationsList.push(newDonation);
        currentTotalDonations += msg.value;
    }
    //funds are allocated according to goal met...check if goal was met, if so, creatorAddress.transfer(address(this).balance), if not, look it up
    function releaseFund() public {
        ///require( state whatever )
        require(projectAddress == msg.sender, “not creator”);
        require(block.timestamp > endDate, “not ended”);
        require(address (this).balance >= goalAmount, “sorry, your campaign did not meet its goal”);
        payable(projectAddress).transfer(address (this).balance);
    }
    //scientist can cancel campaign
}
//look up how to transfer eth on a certain date in solidity
//maybe use new Date Javascript function to trigger from the front end a function in smart contract that allocates the funds
