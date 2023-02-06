// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IStargateHandler {
    function processMessage(bytes calldata message, address sender) external;
}