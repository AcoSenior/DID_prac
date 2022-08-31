const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const router = express.Router();

const baseUrl = 'http://localhost:8000/api/Oauth';
const asite = 'dkstnghks';
const code = crypto.createHash('sha256').update(asite).digest('base64'); // * a사이트 인가코드

const Otp = {
    clientId: '41f18d0fe5000fefe118140548e11dd',
    redirectUri: 'http://localhost:4000',
};

router.get('/RedirectUrl', async (req, res) => {
    // clientId = restAPI
    const url = `http://localhost:8080?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=${code}`;
    res.redirect(url);
});

router.post('/getCode', async (req, res) => {
    console.log('asdf???')
    console.log(req.body)




    // const RestAPI = userOTP.clientId;

    // const Data = {
    //     clientId: RestAPI,
    //     grant_type: 'authorization_code',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };
    try {
        // await axios.post(`${baseUrl}/getToken`, Data);
    } catch (error) {
        console.log(error);
    }
});

router.post('/oAuthGetToken', async (req, res) => {
    const response = req.body;

    console.log(response);

    // const ID_TOKEN = jwt.sign(
    //     {
    //         user,
    //     },
    //     process.env.SECRET_KEY,
    // );
    // ID_TOKEN.split('.')[1]

    // response.id_token =ID_TOKEN.split('.')[1]

    // const TokenUserId = JSON.parse(Buffer.from(splitToken, 'base64').toString('utf-8')).user.userId
    // const TokenUserPw = JSON.parse(Buffer.from(splitToken, 'base64').toString('utf-8')).user.userPw
    // console.log(TokenUserId,TokenUserPw)

    /**
     * oauth서버에서 DATA값받아옴
     * 그 DATA 값에 id_token을 추가해서 front 에 token저장해줘야함 ;
     * 프론트에서 그리고 그 토큰값을 풀어서 userId 랑 userpw 를 대조해서 맞으면 로그인을 성공시켜줘야함
     * 의문점 ? : ACCESS_TOKEN에도 USER값이들어가있는데 굳이 왜 ID_TOKEN을 만들어주는지 모르겠음 ...
     * 의문점 풀이 : access_token은 사실상 back oauth검증 / id _token은 백이랑 프론트 검증용? 이라고생각해보고있음..
     * */
});

<<<<<<< HEAD
router.post('/oAuthRegister', async (req, res) => {
    const { email, password } = req.body;

    try {
        const _user = await Auth.findOne({
            where: {
                email: email,
            },
        });

        const getEncodedHash = bcrypt.compareSync(password, _user.dataValues.password);
        if (getEncodedHash === true) {
            const userPwHash = _user.dataValues.password;
            const toBlockData = {
                email: email,
                password: userPwHash,
                clientId: Otp.clientId,
            };
            const hasUuid = _user.dataValues.uuid;
            if (hasUuid !== null) {
                res.json({
                    status: false,
                    msg: 2,
                });
            }
            const response = await axios.post('http://localhost:8000/api/Oauth/register', toBlockData);
            res.json({
                status: true,
                data: response.data.email,
            });
        } else {
            res.json({
                status: false,
                msg: 1,
            });
        }
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/getuuid', async (req, res) => {
    console.log('uuid옴???');
    const { uuid, email } = req.body;
    console.log(uuid, email);
    const _user = await Auth.findOne({
        where: {
            email: {
                [Op.eq]: email,
            },
        },
    });
    if (_user) {
        await Auth.update({ uuid: uuid }, { where: { email: email } });
    }
});

=======
>>>>>>> cfbccdf0c281b3de026b413ed0a602da41c78728
module.exports = router;
