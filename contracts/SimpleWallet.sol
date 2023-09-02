// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SimpleWallet {
    address payable public owner;

    constructor() {
        // Constructor code here
        owner = payable(msg.sender);
    }

    receive() external payable {}

    // Add your functions and state variables below this line

    function withdraw(uint256 _amount) external {
        require(msg.sender == owner, "You are not the owner");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
