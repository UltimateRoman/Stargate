// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./base/MerkleTree.sol";
import "./interfaces/IStargateHandler.sol";

contract StargateAcquirer is MerkleTree, AccessControl {
    uint256 public immutable chainId;
    bytes32 public constant RELAYER_ROLE = keccak256("RELAYER_ROLE");

    event ReceivedMessage(bytes message, address sender, address recipient);
    event ReceivedTransaction(bytes txPayload, address target);

    constructor() {
        chainId = block.chainid;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function receiveMessage(
        bytes calldata _message, 
        address _sender, 
        address _recipient
    ) 
        external 
        onlyRole(RELAYER_ROLE) 
    {
        //addLeaf(_message);
        IStargateHandler(_recipient).processMessage(_message, _sender);
        emit ReceivedMessage(_message, _sender, _recipient);
    }

    function receiveTransaction(
        bytes calldata _payload,
        address _target
    )
        external 
        onlyRole(RELAYER_ROLE)
    {
        (bool success,) = address(_target).call(_payload);
        require(success, "Tx failed");
        emit ReceivedTransaction(_payload, _target);
    }
}