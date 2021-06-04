var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var voteToken = artifacts.require("./voteToken.sol");
var voteContract = artifacts.require("./voteContract.sol");


module.exports = async function (deployer) {
  await deployer.deploy(SimpleStorage);
  await deployer.deploy(voteToken);
  await deployer.deploy(voteContract, voteToken.address);
};
