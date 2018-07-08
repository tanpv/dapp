var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts){

  let electionInstance;

  it("initializes with two candidates", function() {
    return Election.deployed().then(function(instance) {
      return instance.candidatesCount();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });

  it("init candidates with correct values", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidates(1);
    }).then(function(candidate) {
      assert.equal(candidate[0], 1, "correct id");
      assert.equal(candidate[1], "Candidate 1", "correct name");
      assert.equal(candidate[2], 0, "correct vote count");
      return electionInstance.candidates(2);
    }).then(function(candidate) {
      assert.equal(candidate[0], 2, "correct id");
      assert.equal(candidate[1], "Candidate 2", "correct name");
      assert.equal(candidate[2], 0, "correct vote count");
    });
  });

  it("allow a voter to cast a vote", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId =1;
      return electionInstance.vote(candidateId, {from: accounts[0]});
    }).then(function(receipt) {
      return electionInstance.voters(accounts[0]);
    }).then(function(voted) {
      assert.equal(voted, true, "already voted");
      return electionInstance.candidates(candidateId);
    }).then(function(candidate) {
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "increase vote");
    });
  });

});