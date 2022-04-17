// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12; 

contract Campaign {
    enum State {AWAITING_DONATIONS, CAMPAIGN_DATE_PASSED, AWAITING_FUND_WITHDRAWAL, CAMPAIGN_COMPLETE}
    uint public campaignId;
    uint public scientistId;
    address public projectAddress;
    string public title;
    uint public goalAmount; //make sure to have the data from the front end be in wei
    uint256 public startDate;
    uint256 public endDate;
    uint public currentTotalDonations;
    mapping(uint => mapping(address => uint)) public donationsAmount;

    constructor(uint _campaignId, uint _scientistId, address _projectAddress, string memory _title, uint _goalAmount, uint256 _startDate, uint256 _endDate) {
        campaignId = _campaignId;
        scientistId = _scientistId;
        projectAddress = _projectAddress;
        title = _title;
        goalAmount = _goalAmount;
        startDate = _startDate;
        endDate = _endDate;
    }
    function donate(uint _supporterId) public payable {
        require(block.timestamp >= startDate, 'not started');
        require(block.timestamp <= endDate, 'ended');
        donationsAmount[_supporterId][msg.sender] += msg.value;
        currentTotalDonations += msg.value;
    }

    function releaseFund() public {
        require(projectAddress == msg.sender, 'not creator');
        require(block.timestamp > endDate, 'not ended');
        require(address (this).balance >= goalAmount, 'sorry, your campaign did not meet its goal');
        payable(projectAddress).transfer(address (this).balance);
    }
    function refund(uint _supporterId) external {
        require(block.timestamp > endDate, 'not ended');
        require(address (this).balance <= goalAmount, 'the campaign was successful');
        uint balance = donationsAmount[_supporterId][msg.sender];
        donationsAmount[_supporterId][msg.sender] = 0;
        payable (msg.sender).transfer(balance);
    }

}
