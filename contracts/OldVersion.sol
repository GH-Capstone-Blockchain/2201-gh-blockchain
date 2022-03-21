pragma solidity ^0.5.0;

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
    address public creatorAddress;
    string public title;
    uint public goal;
    uint256 public endDate;
    Donation[] public donationsList;

    uint public currentTotalDonations = address(this).balance;
    //add another variable of history of donations

    struct Donation {
        address supporterAddress;
        uint donationAmount;
    }

    constructor(uint _campaignId, uint _scientistId, address _creatorAddress, string memory _title, uint _goal, uint256 _endDate) public {
        campaignId = _campaignId;
        scientistId = _scientistId;
        creatorAddress = _creatorAddress;
        title = _title;
        goal = _goal;
        endDate = _endDate;
    }


    //donors can donate to the campaign
    function donate(uint _supporterId) public payable {
        // address(this).transfer(msg.value); ..maybe this is done automatically?
        
       
    }
    
    //funds are allocated according to goal met...check if goal was met, if so, creatorAddress.transfer(address(this).balance), if not, look it up


    //scientist can cancel campaign


}

//look up how to transfer eth on a certain date in solidity
//maybe use new Date Javascript function to trigger from the front end a function in smart contract that allocates the funds
