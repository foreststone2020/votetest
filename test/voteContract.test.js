const { accounts, contract } = require('@openzeppelin/test-environment');
const { time } = require('@openzeppelin/test-helpers');

const { expect } = require('chai');
const assert = require('assert');
const voteContract = contract.fromArtifact("voteContract");
const voteToken = contract.fromArtifact("voteToken");




const [owner, alice, bob] = accounts;

describe('fludity basic test', function () {
    beforeEach(async function () {
        this.CoinTokenInstance = await voteToken.new({ from: owner });
        this.voteContractInstance = await voteContract.new(this.CoinTokenInstance.address, { from: owner });

    });

    it('test deposit', async function () {
        this.timeout(20000000);

        await this.CoinTokenInstance.transfer(alice, 1000000000000, { from: owner });
        await this.CoinTokenInstance.transfer(bob, 1000000000000, { from: owner });

        await this.CoinTokenInstance.approve(this.voteContractInstance.address, 1000000000000, { from: owner });
        await this.CoinTokenInstance.approve(this.voteContractInstance.address, 1000000000000, { from: alice });
        await this.CoinTokenInstance.approve(this.voteContractInstance.address, 1000000000000, { from: bob });

        await this.voteContractInstance.vote("zhangsan", 40000, { from: owner });
        await this.voteContractInstance.vote("lisi", 40000, { from: owner });
        await this.voteContractInstance.vote("wangwu", 40000, { from: owner });

        await this.voteContractInstance.vote("zhangsan", 20000, { from: alice });
        await this.voteContractInstance.vote("lisi", 50000, { from: alice });
        await this.voteContractInstance.vote("wangwu", 60000, { from: alice });

        await this.voteContractInstance.vote("zhangsan", 90000, { from: bob });
        await this.voteContractInstance.vote("lisi", 50000, { from: bob });
        await this.voteContractInstance.vote("wangwu", 70000, { from: bob });

        var zhangsanAmount = await this.voteContractInstance.getCandidateAmount("zhangsan");
        var lisiAmount = await this.voteContractInstance.getCandidateAmount("lisi");
        var wangwuAmount = await this.voteContractInstance.getCandidateAmount("wangwu");

        expect(zhangsanAmount.toString()).to.equal("150000");
        expect(lisiAmount.toString()).to.equal("140000");
        expect(wangwuAmount.toString()).to.equal("170000");

        var oneAmount = await this.voteContractInstance.getVoterAmount(owner);
        var twoAmount = await this.voteContractInstance.getVoterAmount(alice);
        var threeAmount = await this.voteContractInstance.getVoterAmount(bob);

        expect(oneAmount.toString()).to.equal("120000");
        expect(twoAmount.toString()).to.equal("130000");
        expect(threeAmount.toString()).to.equal("210000");

        await assert.rejects(
            this.voteContractInstance.claim({ from: owner }),

            (err) => {
                assert.strictEqual(err.message, 'Returned error: VM Exception while processing transaction: revert end block number is not reach -- Reason given: end block number is not reach.');
                return true;
            }
        );

        var currentBlock = await time.latestBlock();
        var target = parseInt(currentBlock) + 1000;
        await time.advanceBlockTo(target)

        var balanceAlice = await this.CoinTokenInstance.balanceOf(alice);
        expect(balanceAlice.toString()).to.equal("999999870000");

        this.voteContractInstance.claim({ from: alice });

        balanceAlice = await this.CoinTokenInstance.balanceOf(alice);
        expect(balanceAlice.toString()).to.equal("1000000000000");

        await assert.rejects(
            this.voteContractInstance.vote("zhangsan", 40000, { from: owner }),

            (err) => {
                assert.strictEqual(err.message, 'Returned error: VM Exception while processing transaction: revert end block number is reached -- Reason given: end block number is reached.');
                return true;
            }
        );

    });
});