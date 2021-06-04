// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract voteContract {
    mapping(string => uint256) candidate;
    mapping(address => uint256) voter;
    string[] candidateName = ["zhangsan", "lisi", "wangwu"];

    address tokenAddress;
    uint256 endBlockNumber;

    modifier checkName(string memory _candidateName) {
        require(
            isCandidataNameValid(_candidateName),
            "CandidateName is Invalid"
        );
        _;
    }

    modifier checkEnd() {
        require(block.number < endBlockNumber, "end block number is reached");
        _;
    }

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
        endBlockNumber = block.number + 1000;
    }

    function isCandidataNameValid(string memory _candidateName)
        internal
        view
        returns (bool)
    {
        for (uint256 index = 0; index < candidateName.length; ++index) {
            string memory tempName = candidateName[index];
            if (
                keccak256(bytes(tempName)) == keccak256(bytes(_candidateName))
            ) {
                return true;
            }
        }
        return false;
    }

    function vote(string memory _candidateName, uint256 amount)
        public
        checkName(_candidateName)
        checkEnd
    {
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        candidate[_candidateName] += amount;
        voter[msg.sender] += amount;
    }

    function getCandidateAmount(string memory _candidateName)
        public
        view
        returns (uint256)
    {
        return candidate[_candidateName];
    }

    function getVoterAmount(address user) public view returns (uint256) {
        return voter[user];
    }

    function claim() public {
        require(block.number > endBlockNumber, "end block number is not reach");

        IERC20(tokenAddress).transfer(msg.sender, voter[msg.sender]);
        delete voter[msg.sender];
    }
}
