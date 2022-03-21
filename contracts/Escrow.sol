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

    // struct Project {
    //     address creatorAddress;
    //     uint goal;
    //     uint totalAmtRaised;
    //     //convert to UNIX timestamps
    //     uint32 startAt;
    //     uint32 endAt;
    //     bool claimed;
    // }   

    constructor(address _project, uint _goalAmount) {
        project = _project;
        goalAmount = _goalAmount;
    }
    
    // function launch(
    //     uint _goal,
    //     uint32 _startAt,
    //     uint32 _endAt
    // ) external {
    //     require(_startAt >= block.timestamp, "start at < now");
    //     require(_endAt >= _startAt, "end at < start at");

    //     count += 1;
    //     projects[count] = Project({
    //         creatorAddress: msg.sender,
    //         goal: _goal,
    //         totalAmtRaised: 0,
    //         startAt: _startAt,
    //         endAt: _endAt,
    //         claimed: false
    //     })

    // }

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