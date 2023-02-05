// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTree {
    bytes32[] public leaves;
    uint32 public depth;
    uint32 public leafCount;

    function addLeaf(bytes32 leaf) public {
        leaves.push(leaf);
        leafCount++;
        uint32 nodeCount = 1;
        uint32 level = 0;
        while (nodeCount < leafCount) {
            nodeCount = nodeCount * 2;
            level++;
        }
        depth = level;
    }

    function computeRoot() public view returns (bytes32) {
        uint32 nodeCount = 1;
        uint32 level = 0;
        while (nodeCount < leafCount) {
            nodeCount = nodeCount * 2;
            level++;
        }

        bytes32[] memory nodes = new bytes32[](nodeCount - 1);

        for (uint32 i = 0; i < leafCount; i++) {
            nodes[i + nodeCount - leafCount - 1] = leaves[i];
        }

        for (uint32 i = nodeCount - leafCount - 1; i < nodeCount - 1; i++) {
            uint32 left = 2 * i + 1;
            uint32 right = 2 * i + 2;
            nodes[(i - 1) / 2] = keccak256(abi.encodePacked(nodes[left], nodes[right]));
        }

        return nodes[0];
    }

    function generateProof(uint32 index) public view returns (bytes32[] memory) {
        bytes32[] memory proof = new bytes32[](depth);
        uint32 node = index + uint32(1 << depth) - leafCount - 1;

        for (uint32 i = 0; i < depth; i++) {
            uint32 sibling = node ^ 1;
            proof[depth - i - 1] = (node % 2 == 0) ? leaves[sibling] : leaves[node];
            node = (node - 1) / 2;
        }

        return proof;
    }

    function verifyProof(bytes32 leaf, bytes32[] calldata proof, bytes32 root) public pure returns (bool) {
        return MerkleProof.verifyCalldata(proof, root, leaf);
    }
}
