const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const axios = require('axios');
const Web3 = require('web3');
const router = express.Router();
// const DID = require('../contracts/DID.json');
const { deployed } = require('../../web3.js');
const { AppInfo, RedirectURI, getUserInfo } = require('../../models');
const { Op } = require('sequelize');
const { generateHash } = require('../../utils/makehash.js');

router.post('/apiDistribution', async (req, res) => {
    const { appName, email } = req.body;

    const AppCodes = generateHash(appName, email);
    const RestAPI = AppCodes[0];
    const client_secret = AppCodes[1];
    console.log(RestAPI);
    console.log(client_secret);

    try {
        const exAppName = await AppInfo.findOne({
            where: {
                AppName: appName,
            },
        });

        if (exAppName) {
            const response = {
                status: false,
                msg: '이미 사용 중인 어플리케이션 이름입니다.',
            };
            res.json(response);
            return;
        }

        await AppInfo.create({
            owner: email,
            appName: appName,
            RestAPI: RestAPI,
            Client_secret: client_secret,
        });

        await getUserInfo.create({
            RestAPI: RestAPI,
            email: false,
            name: false,
            gender: false,
            age: false,
            mobile: false,
            addr: false,
        });

        const response = {
            status: true,
            msg: '성공적으로 등록되었습니다.',
        };

        res.json(response);
    } catch (e) {
        console.log(e.message);
        const response = {
            status: false,
            msg: '서버 에러',
        };
        res.json(response);
    }
});

router.use('/getMyApp', async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        const myAppName = await AppInfo.findAll({
            where: {
                owner: email,
            },
        });

        const response = {
            myapp: myAppName,
        };
        res.json(response);
    } catch (e) {
        console.log(e.message);
        const response = {
            status: false,
            msg: '서버 에러',
        };
        res.json(response);
    }
});

router.use('/appInfo', async (req, res) => {
    const { appName, email } = req.body;
    console.log(appName, email);
    try {
        const thatApp = await AppInfo.findOne({
            where: {
                appName: appName,
                owner: email,
            },
        });

        const appInfo = thatApp.dataValues;

        // redirectURI
        const redirectURI = await RedirectURI.findAll({
            where: {
                RestAPI: appInfo.RestAPI,
            },
        });

        let realSender = [null, null, null, null, null];

        if (redirectURI.length !== 0) {
            for (let i = 0; i < redirectURI.length; i++) {
                realSender[i] = redirectURI[i].redirectURI;
            }
        }

        console.log(realSender);

        // getUserInfo
        const infoReq = await getUserInfo.findOne({
            where: {
                RestAPI: appInfo.RestAPI,
            },
        });

        const appInfor = {
            id: appInfo.idx,
            email: appInfo.email,
            appName: appInfo.appName,
            redirectURI: realSender,
            restAPI: appInfo.RestAPI,
            clientSecretKey: appInfo.Client_secret,
            getInfo: [
                { att: 'name', get: infoReq.name },
                { att: 'email', get: infoReq.email },
                { att: 'gender', get: infoReq.gender },
                { att: 'age', get: infoReq.age },
                { att: 'address', get: infoReq.addr },
                { att: 'mobile', get: infoReq.mobile },
            ],
        };

        // console.log(appInfor);

        const response = {
            status: true,
            appInfo: appInfor,
        };

        res.json(response);
    } catch (e) {
        console.log(e.message);

        res.json({
            status: false,
            msg: '비정상적 접근이 감지되었습니다.',
        });
    }
});

router.use('/updateRedirect', async (req, res) => {
    const { uri, email, appName, RestAPI } = req.body;
    console.log(uri);
    for (let i = 0; i < uri.length; i++) {
        if (uri[i] !== null) {
            uri[i] = uri[i].trim();
            console.log(uri[i]);
        }
    }

    try {
        const oldRedirectURI = await RedirectURI.destroy({
            where: {
                RestAPI: RestAPI,
            },
        });

        const newRedirectURI = [];

        for (let i = 0; i < uri.length; i++) {
            if (uri[i] !== null) {
                newRedirectURI.push(uri[i]);
            }
        }

        for (let i = 0; i < newRedirectURI.length; i++) {
            const newInsert = await RedirectURI.create({
                RestAPI: RestAPI,
                redirectURI: newRedirectURI[i],
            });
        }

        const response = {
            status: true,
            msg: '리다이렉트 uri 수정이 완료되었습니다.',
        };
        res.json(response);
    } catch (e) {
        console.log(e.message);
        res.json({
            status: false,
            msg: '알수 없는 에러가 발생하였습니다. 나중에 다시 시도해주세요',
        });
    }
});

router.use('/getInfoUpdate', async (req, res) => {
    const { getUserInfor, RestAPI } = req.body;
    const newGetInfo = [];

    for (let i = 0; i < getUserInfor.length; i++) {
        if (getUserInfor[i].get == true) {
            newGetInfo.push(1);
        } else {
            newGetInfo.push(0);
        }
    }

    try {
        const update = await getUserInfo.update(
            {
                email: newGetInfo[1],
                name: newGetInfo[0],
                gender: newGetInfo[2],
                age: newGetInfo[3],
                addr: newGetInfo[4],
                mobile: newGetInfo[5],
            },
            {
                where: {
                    RestAPI: RestAPI,
                },
            },
        );

        const response = {
            status: true,
            msg: '성공적으로 반영되었습니다.',
        };

        res.json(response);
    } catch (e) {
        console.log(e.message);
        const response = {
            status: false,
            msg: '서버 에러',
        };
        res.json(response);
    }
});

module.exports = router;
