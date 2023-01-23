// SPDX-License-Identifier: MIT

pragma solidity ^0.4.26;

contract CampaignFactory {
    address[] deployedCampaigns;

    function createCampaign(uint minContribution) public {
        address newCampaign = new Campaign(minContribution, msg.sender); 
        // we need to pass down the msg variable as manager
        // overwise the factory's address will be the msg.sender in Campaign
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaigns;
    }
}

// fund raising campaign
contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) requestApprovers; //track who has approved this request
    }
    Request[] public requests;
    address public manager;
    uint public minContribution;
    mapping(address => bool) public contributors; //track who has donated to this campaign
    uint public contributorsCount;
    uint public requestsCount;

    constructor(uint _minContribution, address creator) public {
        manager=creator;
        minContribution=_minContribution;
    } 

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }

    function contribute() public payable {
        require(msg.value >= minContribution, "minimum contribution is not met");
        contributors[msg.sender] = true;
        contributorsCount++;
    }

  function createRequest(string _desc, uint _value, address _recipient) public restricted {
      require( _value <= address(this).balance, "not enough money to create this request");
      Request memory newReq = Request({
          description: _desc,
          value: _value,
          recipient: _recipient, 
          complete: false,
          approvalCount: 0
          });
      requests.push(newReq);
      requestsCount++;
  }

    // approve a specific request
    function approveRequest(uint requestIndex) public {
        require(contributors[msg.sender], "user has to be a contributror first");
        require(requestIndex < requests.length, "request with provided index not found");
        Request storage targetRequest = requests[requestIndex];

        require(! targetRequest.requestApprovers[msg.sender], "contributor has already voted on this request");
        targetRequest.approvalCount++;
        targetRequest.requestApprovers[msg.sender]=true;
    }

    // transfer funds if request is approved by majority of contributors
    function finalizeRequest(uint requestIndex) public restricted {
        require(requestIndex < requests.length, "request with provided index not found");
        Request storage targetRequest = requests[requestIndex];
        require(! targetRequest.complete, "request has already been processed");
        require(targetRequest.approvalCount > contributorsCount/2, "50% of contributors have to approve this request");
        targetRequest.recipient.transfer(targetRequest.value);
        targetRequest.complete=true;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minContribution,
            address(this).balance,
            requestsCount,
            contributorsCount,
            manager
        );
    }

}