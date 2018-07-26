pragma solidity ^0.4.24;

contract Election {

  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  mapping(uint => Candidate) public candidates;  
  uint public candidatesCount;

  mapping(address => bool) public voters;

  // http://solidity.readthedocs.io/en/v0.4.21/contracts.html#events
  event votedEvent (
    uint indexed _candidateId,
    address voter
  );

  event constructor (
    address owner
  );

  constructor() public {
    addCandidate("Candidate1");
    addCandidate("Candidate2");
    emit constructor(msg.sender);
  }

  function addCandidate (string _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }

  function vote (uint _candidateId) public {
    // valid vote condition
    // require(!voters[msg.sender]);
    require(_candidateId < candidatesCount);

    // increase vote count and remove vote righ
    candidates[_candidateId].voteCount += 1;
    voters[msg.sender] = true;

    // emit vote event
    emit votedEvent(_candidateId, msg.sender);
  }
}