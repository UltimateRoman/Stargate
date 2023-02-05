// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./base/MerkleTree.sol";

contract StargateOriginator is MerkleTree {
    uint256 public immutable chainId;

    event DispatchMessage(bytes32 message, address sender, address recipient);

    constructor() {
        chainId = block.chainid;
    }

    function dispatchMessage(bytes32 _message, address _recipient) external {
        addLeaf(_message);
        emit DispatchMessage(_message, msg.sender, _recipient);
    }
}