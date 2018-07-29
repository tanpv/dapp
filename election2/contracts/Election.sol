// specify compiler version
pragma solidity ^0.4.24;

// define contract
contract Election {
  
  // data
  // define candidate structure
  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  // define map to store multiple candidates
  mapping(uint => Candidate) public candidates;

  // number of candidate
  uint public candidatesCount;

  // define map to store voters and state of vote
  mapping(address => bool) public voters;

  // event to communicate with outside of blockchain
  event voteEvent (
    uint indexed _candidateId
  );

  // function

  // constructor function
  constructor () public {
    addCandidate("Candidate 1");
    addCandidate("Candidate 2");
  }

  // add candidates function
  function addCandidate(string _candidateName) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _candidateName, 0);
  }

  // vote function
  function vote(uint _candidateId) public {
    require(voters[msg.sender] != true);
    require(_candidateId < candidatesCount);
    candidates[_candidateId].voteCount ++;
    voters[msg.sender] = true;
    emit voteEvent(_candidateId);
  }
}

// pragma solidity ^0.4.24;

// contract Election {

//   // build structure for candidate
//   struct Candidate {
//     uint id;
//     string name;
//     uint voteCount;
//   }

//   // create a map to store candidate, this could be change to array ?
//   mapping(uint => Candidate) public candidates;  

//   // control the numer of candidates
//   uint public candidatesCount;

//   // control voters
//   mapping(address => bool) public voters;

//   // http://solidity.readthedocs.io/en/v0.4.21/contracts.html#events
//   // event to communicate with outside of blockchain
//   event votedEvent (
//     uint indexed _candidateId,
//     address voter
//   );

//   constructor() public {
//     addCandidate("Candidate1");
//     addCandidate("Candidate2");
//   }

//   function addCandidate (string _name) private {
//     candidatesCount ++;
//     candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
//   }

//   function vote (uint _candidateId) public {
//     // valid vote condition
//     require(!voters[msg.sender]);
//     require(_candidateId < candidatesCount);

//     // increase vote count and remove vote righ
//     candidates[_candidateId].voteCount += 1;
//     voters[msg.sender] = true;

//     // emit vote event
//     emit votedEvent(_candidateId, msg.sender);
//   }
// }