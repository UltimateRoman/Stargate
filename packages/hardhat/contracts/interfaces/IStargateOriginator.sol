// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IStargateOriginator {
    function dispatchMessage(bytes calldata message, address sender) external;
}