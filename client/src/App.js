import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import voteContract from "./contracts/voteContract.json";
import voteToken from "./contracts/voteToken.json";

import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, tokenContract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // const deployedNetwork = voteContract.networks[networkId];
      const instance = new web3.eth.Contract(
        voteContract.abi,
        "0xB88952EC7c068F62891d7047071e8542a39C12aE",
      );

      const tokenInstance = new web3.eth.Contract(
        voteToken.abi,
        "0xB8FB0BE7F161D44ae5c70EAb7FDBd5c3bC283fEa",
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, tokenContract: tokenInstance });
      this.runExample();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    var zhangsanAmount = await contract.methods.getCandidateAmount("zhangsan").call();
    document.getElementById('zhangsan_amount').innerHTML = zhangsanAmount.toString();

    var zhangsanAmount = await contract.methods.getCandidateAmount("lisi").call();
    document.getElementById('lisi_amount').innerHTML = zhangsanAmount.toString();
    var zhangsanAmount = await contract.methods.getCandidateAmount("wangwu").call();
    document.getElementById('wangwu_amount').innerHTML = zhangsanAmount.toString();

  };

  btnVote = async () => {
    const { accounts, contract, tokenContract } = this.state;
    // document.getElementById('zhangsan_amount').innerHTML = "投票中";

    await tokenContract.methods.approve("0xB88952EC7c068F62891d7047071e8542a39C12aE", 10000000).send({ from: accounts[0] }).then(async function (receipt) {

    });
    document.getElementById('zhangsan_amount').innerHTML = "投票中";
    await contract.methods.vote("zhangsan", 100).send({ from: accounts[0] }).then(function (receipt) {
    });
    await contract.methods.vote("lisi", 100).send({ from: accounts[0] }).then(function (receipt) {
    });
    await contract.methods.vote("wangwu", 100).send({ from: accounts[0] }).then(function (receipt) {
    });

    this.runExample()
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div><tr>
          <td className="td1"> zhangsan:<label name="input_txt"
            className="input_cs"
            id="zhangsan_amount"
            type="text" > </label></td>

        </tr>
          <tr>
            <td className="td1"> lisi:<label name="input_txt"
              className="input_cs"
              id="lisi_amount"
              type="text" > </label></td>

          </tr><tr>
            <td className="td1"> wagnwu:<label name="input_txt"
              className="input_cs"
              id="wangwu_amount"
              type="text" > </label></td>

          </tr>
          <tr>
            <button className="tb1"
              onClick={this.btnVote}> 投票100
                                </button></tr>
        </div>
      </div>
    );
  }
}

export default App;
