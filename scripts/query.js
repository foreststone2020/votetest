const voteToken = artifacts.require("voteToken");
const voteContract = artifacts.require("voteContract");


function getAccounts() {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((error, accounts) => {
            resolve(accounts);
        });
    });
};


module.exports = async function () {
    try {
        const accounts = await getAccounts();
        const voteInstance = await voteContract.deployed();
        const voteTokenInstance = await voteToken.deployed();


        const accountOne = accounts[0];
        console.log(`accountOne ${accountOne}`)
        const accountTwo = accounts[1];
        console.log(`accountOne ${accountTwo}`)
        const accountThree = accounts[2];
        console.log(`accountOne ${accountThree}`)


        var zhangsanAmount = await voteInstance.getCandidateAmount("zhangsan");
        var lisiAmount = await voteInstance.getCandidateAmount("lisi");
        var wangwuAmount = await voteInstance.getCandidateAmount("wangwu");
        console.log(zhangsanAmount.toString(), "-------", lisiAmount.toString(), "-------", wangwuAmount.toString());


        var oneAmount = await voteInstance.getVoterAmount(accountOne);
        var twoAmount = await voteInstance.getVoterAmount(accountTwo);
        var threeAmount = await voteInstance.getVoterAmount(accountThree);
        console.log(oneAmount.toString(), "-------", twoAmount.toString(), "-------", threeAmount.toString());

        //deposit
        console.log(`----------------------------------------------------------------`)

    } catch (err) {
        console.log(`getAtokenBalance   error    ${err}`)
        console.error('unexpected error:', err)
        process.exit(1)
    }

    process.exit();
};
