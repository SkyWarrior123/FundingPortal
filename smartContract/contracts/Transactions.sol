// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.8;

contract Transactions {


    event Transfer(address from, address receiver, uint amount);
  
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount) public {

        transactions.push(TransferStruct(msg.sender, receiver, amount));

        emit Transfer(msg.sender, receiver, amount);
    }
}