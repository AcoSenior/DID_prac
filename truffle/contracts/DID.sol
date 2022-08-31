// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import './IDID.sol';

contract DID is IDID {
    mapping(string => User) private user;
    // hash(id+pw) => user class object

    mapping(string => bool) private registeredUser;
    // hash(id+pw) => t(등록됨)/f(등록 안됨) 

        string gender;
        string name;
        uint8 age;
        string addr;
        string mobile;
        string email;

    // 사용자 등록 in blockchain
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

    // id는 바뀔 일이 없지만 pw는 바뀔 수 있고, 이 경우 hash 값도 같이 바뀐다.
    // 따라서 사용자가 pw를 바꾸는 경우의 함수는 따로 만들어야 한다.
    // 이건 컨트랙트 뿐만 아니라, oauth 백앤드, 프론트에서도 감안하고 코드를 짜야 함
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