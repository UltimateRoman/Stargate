// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/IStargateOriginator.sol";

contract DestinationToken is ERC20, ERC20Burnable, AccessControl {
    address public originator;
    address public acquirer;
    address public mirroredTokenAddress;

    bytes32 public constant ACQUIRER_ROLE = keccak256("ACQUIRER_ROLE");

    mapping(address => uint256) lockedAmount;

    event DepositedTokens(uint256 amount, address user);
    event ReleasedTokens(uint256 amount, address user);

    constructor(
        address _originator,
        address _acquirer,
        string memory _name, 
        string memory _symbol
    ) 
        ERC20(_name, _symbol) 
    {
        originator = _originator;
        acquirer = _acquirer;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ACQUIRER_ROLE, _acquirer);
    }

    function setOriginator(address _originator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        originator = _originator;
    }

    function setAcquirer(address _acquirer) external onlyRole(DEFAULT_ADMIN_ROLE) {
        acquirer = _acquirer;
        _grantRole(ACQUIRER_ROLE, _acquirer);
    }

    function setMirroredTokenAddress(address _mirroredTokenAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
        mirroredTokenAddress = _mirroredTokenAddress;
    }

    function withdraw(uint256 amount) external {
        _burn(msg.sender, amount);
        lockedAmount[msg.sender] -= amount;
        bytes memory message = abi.encode(amount, msg.sender);
        IStargateOriginator(originator).dispatchMessage(message, mirroredTokenAddress);
        emit ReleasedTokens(amount, msg.sender);
    }

    function processMessage(bytes calldata message, address sender) external onlyRole(ACQUIRER_ROLE) {
        require(sender == mirroredTokenAddress, "Invalid sender");
        (uint256 amount, address user) = abi.decode(message, (uint256,address));
        lockedAmount[user] += amount;
        _mint(user, amount);
        emit DepositedTokens(amount, user);
    }
}
