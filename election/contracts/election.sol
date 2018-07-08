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
  uint public candidatesCount;

  // store voter
  mapping(address => bool) public voters;
  
  constructor () public {
    addCandidate("Candidate 1");
    addCandidate("Candidate 2");
  }

  function addCandidate(string _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }
}

