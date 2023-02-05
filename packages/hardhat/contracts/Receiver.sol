// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./base/MerkleTree.sol";

interface IHandler {
    function processMessage(bytes32 message, address sender) external;
}

contract Receiver is MerkleTree, AccessControl {
    bytes32 public constant RELAYER_ROLE = keccak256("RELAYER_ROLE");

    event ReceivedMessage(bytes32 message, address sender, address recipient);

    function receiveMessage(bytes32 _message, address _sender, address _recipient) external onlyRole(RELAYER_ROLE) {
        addLeaf(_message);
        IHandler(_recipient).processMessage(_message, _sender);
        emit ReceivedMessage(_message, _sender, _recipient);
    }
}