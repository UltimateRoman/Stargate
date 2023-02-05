// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./base/MerkleTree.sol";

interface IStargateHandler {
    function processMessage(bytes32 message, address sender) external;
}

contract StargateAcquirer is MerkleTree, AccessControl {
    uint256 public immutable chainId;
    bytes32 public constant RELAYER_ROLE = keccak256("RELAYER_ROLE");

    event ReceivedMessage(bytes32 message, address sender, address recipient);

    constructor() {
        chainId = block.chainid;
    }

    function receiveMessage(
        bytes32 _message, 
        address _sender, 
        address _recipient
    ) 
        external 
        onlyRole(RELAYER_ROLE) 
    {
        addLeaf(_message);
        IStargateHandler(_recipient).processMessage(_message, _sender);
        emit ReceivedMessage(_message, _sender, _recipient);
    }
}