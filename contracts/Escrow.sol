// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
contract Escrow {
    // address public supporter;
    address public project;
    uint public goalAmount;
    uint public currentTotalDonation;
    Donation[] public donationList;

    // mapping(uint => Donation) public donations;
    
    struct Donation {
        address supporter;
        uint donationAmount;
    }

    event supporterDonated (
        address supporter,
        uint donationAmount
    );

    constructor(address _project, uint _goalAmount) {
        project = _project;
        goalAmount = _goalAmount;
    }
    
    function receivingFunds(address _supporter) public payable {
        // emit supporterDonated(_supporter, msg.value);
        Donation memory newDonation = Donation(
            {
                supporter: _supporter,
                donationAmount: msg.value
            }
        );
        donationList.push(newDonation);
        currentTotalDonation += msg.value;
    }
 
    function releaseFund() public {
        require(address (this).balance >= goalAmount);
        payable(project).transfer(address (this).balance);
    }
}