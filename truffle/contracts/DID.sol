// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import './IDID.sol';

contract DID is IDID {
    mapping(string => User) private user;
    mapping(string => bool) private registeredUser;
    // constructor(string memory _hashedId){
    //     user[_hashedId] = User('Female','ivy',10, unicode"서울시 광진구",'010-1111-1111','yellow_w@naver.com','1234');
    // }

        string gender;
        string name;
        uint8 age;
        string addr;
        string mobile;
        string email;

    function registerUser (string memory _hashedId, User memory _data) external{
        require(!registeredUser[_hashedId]);
        
        User memory userObj;
     
        userObj.gender = _data.gender;
        userObj.name = _data.name;
        userObj.age = _data.age;
        userObj.addr = _data.addr;
        userObj.mobile = _data.mobile;
        userObj.email = _data.email;

        registeredUser[_hashedId] = true;
        user[_hashedId] = _data;
    }

    function updatePassword (string memory _hashedId,string memory _hashedId_new)external{
        require(isRegistered(_hashedId));
        user[_hashedId_new] = user[_hashedId];
        deleteUser(_hashedId);
    }

    function updateUser (string memory _hashedId, User memory _data) external{
        require(registeredUser[_hashedId]);
        User memory userObj;
     
        userObj.gender = _data.gender;
        userObj.name = _data.name;
        userObj.age = _data.age;
        userObj.addr = _data.addr;
        userObj.mobile = _data.mobile;
        userObj.email = _data.email;

        user[_hashedId] = userObj;
    }

    function deleteUser (string memory _hashedId) public{
        require(registeredUser[_hashedId]);

        delete user[_hashedId];
        registeredUser[_hashedId] = false;
    }
    
    function getUser(string memory _hashedId) view external returns(User memory){
        return user[_hashedId];        
    }

    function isRegistered(string memory _hashedId) view public returns(bool){
        return registeredUser[_hashedId];
    }
}