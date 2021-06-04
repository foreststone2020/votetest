// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract voteToken is ERC20("VOTETOKEN", "VT") {
    constructor() {
        _mint(msg.sender, 1000000000 * 1e18);
    }
}
