// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/IStargateOriginator.sol";

contract OriginToken is ERC20, ERC20Burnable, AccessControl {
    address public originator;
    address public acquirer;
    address public mirroredTokenAddress;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
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
        _grantRole(MINTER_ROLE, msg.sender);
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

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function deposit(uint256 amount) external {
        transferFrom(msg.sender, address(this), amount);
        lockedAmount[msg.sender] += amount;
        bytes memory message = abi.encode(amount, msg.sender);
        IStargateOriginator(originator).dispatchMessage(message, mirroredTokenAddress);
        emit DepositedTokens(amount, msg.sender);
    }

    function processMessage(bytes calldata message, address sender) external onlyRole(ACQUIRER_ROLE) {
        require(sender == mirroredTokenAddress, "Invalid sender");
        (uint256 amount, address user) = abi.decode(message, (uint256,address));
        _release(amount, user);
    }

    function _release(uint256 _amount, address _user) internal {
        require(lockedAmount[_user] >= _amount, "Insufficient balance");
        transferFrom(address(this), _user, _amount);
        lockedAmount[msg.sender] -= _amount;
        emit ReleasedTokens(_amount, _user);
    }
}
