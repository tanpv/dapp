module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      host: "localhost",
      port: "8545",
      network_id: 4,
      gas: 4700000
    }
  }
};

// var HDWalletProvider = require("truffle-hdwallet-provider");
// var mnemonic = "Black Orangutans Applauded After Ubiquitous Curly Absentees Attracted Dry Breaded Whips Affectionately";
// // 0xf13b109f1d31a1fd760868ef8dc90b90fb6c8800
// module.exports = {
//   networks: {
//     ropsten: {
//       provider: function() {
//         return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/abbe691d210c470bbb9e2956e2f82c49")
//       },
//       network_id: 3
//     }
//   }
// };
