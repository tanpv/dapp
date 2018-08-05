App = {

  // provider mean what blockchain
  web3Provider: null,

  // store and manage contracts
  contracts: {},

  // which account is interact with blockchain
  account: '0x0',

  // voted or not
  hasVoted: false,

  // init the app
  init: function() {
    return App.initWeb3();
  },

  // specify what blockchain you want to interact with
  initWeb3: function() {
    
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  // load contract and bind with blocchain
  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);
      // listen for vote events
      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the blockchain and contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 'latest',
        toBlock: 'latest'
      }).watch(function(error, event) {
        // console.log('trigger event vote')
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  // Do UI render when event trigger
  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();
      // candidatesResults.innerHTML = '';

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();
      // candidatesSelect.innerHTML = '';
      

      console.log(candidatesCount);
      console.log('before');
      console.log(candidatesResults);

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);

          // Render candidate ballot option
          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }

      console.log('after');
      console.log(candidatesResults);

      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    var candidateId = $('#candidatesSelect').val();
    console.log(candidateId)
    // candidateId = 2
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      console.clear()
      console.log(candidateId)
      console.log(result)
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.log(err)
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

// put all app logic code inside class
// App = {

//   contracts : {},

//   // init blockchain for web3
//   init : function () {
//     // console.log(web3);

//     // when already define
//     if (typeof web3 !== 'undefined') {
//       web3 = new Web3(web3.currentProvider);
//     // when not yet define
//     } else {
//       // set the provider you want from Web3.providers
//       web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
//     }
    
//     return App.initContract();
//   },

//   initContract : function(){
//     // read json contract file
//     // create truffle-contract object
//     // set provider for contract
//     $.getJSON("Election.json", function(election){
//       // console.log(election);
//       App.contracts.Election = TruffleContract(election);
//       App.contracts.Election.setProvider(web3.currentProvider);
//       console.log(App.contracts.Election);
//       // because the code of render should only call when contract is ready
//       App.listentEvent();
//       return App.render();
//     });
//   },
  
//   listentEvent : function() {
//     App.contracts.Election.deployed().then(function(instance){
//       instance.voteEvent({}, {fromBlock: 0,toBlock: 'latest'}).watch(function(error, result){
//         console.log('event happen');
//         App.render();
//       })
//     })
//   },

//   render : function(){
//     // render current account
//     web3.eth.getCoinbase(function(error, account){
//       console.log(account);
//       $('#accountAddress').html("your account : " + account);
//     });

//     // render current candidate
//     var candidatesResults = $("#candidatesResults");
//     candidatesResults.empty();
//     var candidatesSelect = $("#candidatesSelect");
//     candidatesSelect.empty();
//     App.contracts.Election.deployed().then(function(i){
//       instance = i;
//       return instance.candidatesCount();
//     }).then(function(count){
//       for(var i=1; i<= count; i++){
//         // return of promise
//         instance.candidates(i).then(function(candidate){
          
//           var id = candidate[0];
//           var name = candidate[1];
//           var voteCount = candidate[2];
          
//           console.log(id);
//           console.log(name);
//           console.log(voteCount);
          
//           var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
//           candidatesResults.append(candidateTemplate);
          
//           var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
//           candidatesSelect.append(candidateOption);
//         })
//       }
//     });
//   },

//   // handle vote
//   // http://solidity.readthedocs.io/en/develop/contracts.html#events
//   vote : function(){
//     console.log('vote happen');
//     var candidateId = $('#candidatesSelect').val();
//     console.log(candidateId);
//     App.contracts.Election.deployed().then(function(i) {
//       instance = i;
//       return instance.vote(candidateId);
//     }).then(function(result){
//       console.log(result);
//     });
//   }
// };

// // when document is ready for use
// $(function(){
//   // when windows is load ready
//   // using callback way
//   $(window).load(function() {
//     App.init();
//   });
// })