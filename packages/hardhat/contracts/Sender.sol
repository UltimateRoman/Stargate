// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./base/MerkleTree.sol";

contract Sender is MerkleTree {
    event SendMessage(bytes32 message, address sender, address recipient);

    function sendMessage(bytes32 _message, address _recipient) external {
        addLeaf(_message);
        emit SendMessage(_message, msg.sender, _recipient);
    }
}