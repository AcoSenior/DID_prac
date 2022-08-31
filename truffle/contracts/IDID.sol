// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

interface IDID {
    struct User{
        string gender;
        string name;
        uint8 age;
        string addr;
        string mobile;
        string email;
    }

    function registerUser (string memory _hashedId ,User memory _data) external;
    function updatePassword (string memory _hashedId,string memory _hashedId_new)external;
    function updateUser (string memory _hashedId, User memory _data) external;
    function deleteUser (string memory _hashedId) external;
    function getUser (string memory _hashedId) view external returns(User memory);
    function isRegistered(string memory _hashedId) view external returns(bool);
}