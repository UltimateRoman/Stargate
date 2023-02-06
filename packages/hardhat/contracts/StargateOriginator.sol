// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./base/MerkleTree.sol";

contract StargateOriginator is MerkleTree {
    uint256 public immutable chainId;

    event DispatchMessage(bytes message, address sender, address recipient);
    event DispatchTransaction(bytes payload, address target);

    constructor() {
        chainId = block.chainid;
    }

    function dispatchMessage(bytes calldata _message, address _recipient) external {
        //addLeaf(_message);
        emit DispatchMessage(_message, msg.sender, _recipient);
    }

    function dispatchTransaction(bytes calldata _payload, address _target) external {
        emit DispatchTransaction(_payload, _target);
    }
}