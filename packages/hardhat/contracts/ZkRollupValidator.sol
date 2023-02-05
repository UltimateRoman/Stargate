pragma solidity ^0.8.0;

contract ZkRollupLibrary {
    function verify(bytes memory message, bytes32 root, string memory blockchain) public view returns (bool) {
        // Implementation of the zk rollup verification algorithm
        // ...
        return true;
    }
}

contract ZkRollupValidator {
    ZkRollupLibrary private zkRollupLibrary;

    constructor(address _zkRollupLibraryAddress) public {
        zkRollupLibrary = ZkRollupLibrary(_zkRollupLibraryAddress);
    }

    function validateMessage(bytes memory message, bytes32 blockchainARoot, bytes32 blockchainBRoot) public view returns (bool) {
        // Verify that the message was created on blockchain A
        if (!zkRollupLibrary.verify(message, blockchainARoot, "blockchainA")) {
            return false;
        }
        
        // Verify that the message was not modified while being transferred to blockchain B
        if (!zkRollupLibrary.verify(message, blockchainBRoot, "blockchainB")) {
            return false;
        }

        // Return True if both verifications are successful
        return true;
    }
}
