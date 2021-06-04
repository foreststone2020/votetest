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
        // const voteInstance = await voteContract.deployed();
        const voteTokenInstance = await voteToken.at("0xB8FB0BE7F161D44ae5c70EAb7FDBd5c3bC283fEa");


        const accountOne = accounts[0];
        console.log(`accountOne ${accountOne}`)
        const accountTwo = accounts[1];
        console.log(`accountOne ${accountTwo}`)
        const accountThree = accounts[2];
        console.log(`accountOne ${accountThree}`)

        const user = "0x3489D205b5FE363125C26B2b519171E328F2e91f";

        await voteTokenInstance.transfer(user, 1000000000000, { from: accountOne });

        // await voteTokenInstance.transfer(accountTwo, 1000000000000, { from: accountOne });
        // await voteTokenInstance.transfer(accountThree, 1000000000000, { from: accountOne });

        // await voteTokenInstance.approve(voteInstance.address, 1000000000000, { from: accountOne });
        // await voteTokenInstance.approve(voteInstance.address, 1000000000000, { from: accountTwo });
        // await voteTokenInstance.approve(voteInstance.address, 1000000000000, { from: accountThree });



        // await voteInstance.vote("zhangsan", 40000, { from: accountOne });
        // await voteInstance.vote("lisi", 40000, { from: accountOne });
        // await voteInstance.vote("wangwu", 40000, { from: accountOne });

        // await voteInstance.vote("zhangsan", 20000, { from: accountTwo });
        // await voteInstance.vote("lisi", 50000, { from: accountTwo });
        // await voteInstance.vote("wangwu", 60000, { from: accountTwo });

        // await voteInstance.vote("zhangsan", 90000, { from: accountThree });
        // await voteInstance.vote("lisi", 50000, { from: accountThree });
        // await voteInstance.vote("wangwu", 70000, { from: accountThree });

        //deposit
        console.log(`----------------------------------------------------------------`)

    } catch (err) {
        console.log(`getAtokenBalance   error    ${err}`)
        console.error('unexpected error:', err)
        process.exit(1)
    }

    process.exit();
};
