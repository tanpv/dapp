pragma solidity ^0.4.24;

contract Election {
  // Candidate model
  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  // store candidate
  mapping(uint => Candidate) public candidates;
  // store vote state
  mapping(address => bool) public voters;
  uint public candidatesCount;
  
  constructor () public {
    addCandidate("Candidate 1");
    addCandidate("Candidate 2");
  }

  function addCandidate(string _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }

  function vote (uint _candidateId) public {
    // require not yet vote
    require(!voters[msg.sender]);

    // require a valid candidate
    require(_candidateId > 0 && _candidateId <= candidatesCount);

    // record voter already voted
    voters[msg.sender] = true;

    // update candidate vote count
    candidates[_candidateId].voteCount ++;
  }
}

