// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
//Solidity is an statically typed language so need to mention variable types

contract CrowdFunding {
    struct Campaign{
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountcollected;
        string image;
        address[] donators;
        uint256[] donations;

    }

    mapping(uint256 => Campaign) public campaigns;
    //this allows for usage such as campaigns[0],.... like in javascript

    //create a global variable which sets the initial value of no.of campaigns
    //It helps to provide ids to the campaigns
    uint256 public numberOfCampaigns = 0;

    //The functions that we want to have

    //For parameters: need to include underscore _ before the name of the parameter
    //need to use memory after the string
    //need to specify the scope of the function and what it returns
    function createCampaign (address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image)
    public returns (uint256){
        //Memory is like RAM whereas storage is like a hard-drive
        //we need to store the campaigns created permanently.
        Campaign storage campaign = campaigns[numberOfCampaigns];
        
        //is everything okay?
        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.deadline = _deadline;
        campaign.amountcollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;

    }
    
    function donateToCampaign(uint256 _id) public payable{
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent)
        {
            campaign.amountcollected = campaign.amountcollected + amount;
        }

    }

    function getDonators(uint256 _id) view public returns(address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() view public returns (Campaign[] memory) {
        Campaign[] memory allcampaigns = new Campaign[](numberOfCampaigns);
        //It has [{}, {}, {},.... equal to numberOfCampaigns]

        //to loop through all of the campaigns and populate the allcampaigns

        for(uint i = 0; i<numberOfCampaigns; i++){
            Campaign storage item = campaigns[i];

            allcampaigns[i] = item;

        }

        return allcampaigns;
    }
}
