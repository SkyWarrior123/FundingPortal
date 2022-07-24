require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: '0.8.8',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/TiFHXrNILfe2Xzmo8COXklPtbrAUaVge',
      accounts: ['eef881b2f30e51daa1848f65161984b725fbf4866d461f5380aa2909edc1cf1e'],
    },
  },
};
