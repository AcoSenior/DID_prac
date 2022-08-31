const express = require('express');
const nodeMailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Auth, sequelize } = require('../models');
const { Op } = require('sequelize');

const generateRandom = (min, max) => {
    const ranNum = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

    const array = [];
    for (let i = 0; i < 6; i++) {
        array.push(ranNum[i]);
    }

    return array;
};

router.post('/email', async (req, res) => {
    const { email, nickName } = req.body;

    try {
        const exEmail = await Auth.findOne({
            where: {
                email: email,
            },
        });

        if (exEmail) {
            return res.status(403).send('이미 사용중인 메일입니다 ');
        }
    } catch (e) {
        console.log(e);
    }
    // 중복 체크하고
    const number = generateRandom(111111, 999999);
    const mailPoster = nodeMailer.createTransport({
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    let mailOptions = {
        from: 'gusdn6671@naver.com',
        to: email,
        subject: '인증번호 입력해주세요 ',
        html: `<div 
        style='
        text-align: center; 
        width: 60%; 
        height: 50%;
        margin: 15%;
        padding: 20px;
        border:2px solid #FFB6C1;
        border-radius: 10px;
        background-color:#FFFAFA;
        '>

        
        <h2 style='
        color:pink;
        font-weight:bold;
        '>아래 6자리 숫자를 화면에 입력해주세요.</h2> <br/>  
        <div style='display: flex;
            justify-content: space-between ;
           '>
           <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[0]}
           </h1>
           
        </div>
        <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[1]}
           </h1>
           
        </div>
        <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[2]}
           </h1>
           
        </div>

        <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[3]}
           </h1>
           
        </div>

        <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[4]}
           </h1>
           
        </div>

        <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[5]}
           </h1>
           
        </div>

   </div>


</div> `,
    };

    mailPoster.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(201);
            res.json({
                status: true,
                number: number,
            });
        }
    });
});

router.post('/SignUp', async (req, res) => {
    const { email, password, nickName } = req.body;
    console.log(email, password, nickName);

    try {
        const exEmail = await Auth.findOne({
            where: {
                email: email,
            },
        });
        const exUserName = await Auth.findOne({
            where: {
                userName: nickName,
            },
        });

        if (exEmail) {
            return res.status(403).send('이미 사용중인 메일입니다 ');
        }

        const hash = await bcrypt.hash(password, 12);
        console.log('asdf??', hash);
        await Auth.create({
            email: email,
            password: hash,
            username: nickName,
            point: 50000,
        });

        res.status(201).json({
            status: 1,
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    const { userEmail, userPw } = req.body;

    try {
        const _user = await Auth.findOne({
            where: {
                email: {
                    [Op.eq]: userEmail,
                },
            },
        });

        if (_user) {
            if (bcrypt.compareSync(userPw, _user.dataValues.password)) {
                delete _user.dataValues.password;
                delete _user.dataValues.point;
                delete _user.dataValues.uuid;
                console.log(_user.dataValues);

                let token = jwt.sign(
                    {
                        ..._user.dataValues,
                    },
                    process.env.SECRET_KEY,
                );

                res.cookie('user', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json({
                    status: true,
                    // userData: _user.dataValues,
                    token: token,
                });
            } else {
                res.json({
                    status: false,
                    msg: '너 비밀번호 틀림 ',
                });
            }
        } else {
            res.json({
                status: false,
                msg: '너 이메일이 틀림 ',
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            msg: '관리자한태 문의바랍니다 ',
        });
    }
});

router.post('/idCheck', async (req, res) => {
    const { email } = req.body;

    try {
        const _email = await Auth.findOne({
            where: {
                email: email,
            },
        });

        if (_email === null) {
            // 사용가능
            res.json({
                status: 1,
            });
        } else {
            // 사용불가
            res.json({
                status: 2,
            });
        }
    } catch (e) {}
});

router.post('/usePoint', async (req, res) => {
    const price = req.body.price;
    try {
        // 사용자 이메일가져오기
        const _user = await Auth.findOne({
            where: {
                email: {
                    [Op.eq]: req.body.email,
                },
            },
        });

        if (_user.dataValues.point >= price) {
            const usePoint = _user.dataValues.point - price;
            const updateClient = _user.dataValues.email;

            await Auth.update({ point: usePoint }, { where: { email: updateClient } });
            res.json({
                status: true,
                msg: '구매완료되었습니다',
            });
        } else {
            res.json({
                status: false,
                msg: '금액 모자릅니다  ',
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/pointInquiry', async (req, res) => {
    // 사용자 가져와야함
    console.log('연결????');
    try {
        const _user = await Auth.findOne({
            where: {
                email: {
                    [Op.eq]: req.body.email,
                },
            },
        });
        // 데이터베이스에 있는 사용자 포인트 가져오기
        const getPoint = _user.dataValues.point;
        res.json({
            status: true,
            point: getPoint,
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/updatePoint', async (req, res) => {
    const { email, usePoint } = req.body;
    const havepoint = await Auth.findOne({
        where: {
            email: email,
        },
    });
    console.log(havepoint.point);
    console.log('123');
    try {
        if (havepoint.point >= usePoint) {
            // havepoint.point - point***
            await Auth.update(
                {
                    point: havepoint.point - usePoint,
                },
                {
                    where: {
                        email: email,
                    },
                },
            );
            res.json({
                status: 1,
                point: havepoint.point - usePoint,
            });
        }
    } catch (e) {
        console.log(e);
        res.json({
            status: 0,
            error: '으악',
        });
    }
});

router.post('/updateUser', async (req, res) => {
    const { email, password, oldPassword } = req.body;
    const clientId = 'aaaa';
    try {
        const _user = await Auth.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });
        const Pwproof = bcrypt.compareSync(oldPassword, _user.dataValues.password);
        if (Pwproof) {
            const oldPw = _user.dataValues.password;
            const hash = await bcrypt.hash(password, 12);
            await axios.post('http://localhost:8000/api/Oauth/upDateRegister', { email, oldPw, clientId, hash });
            await Auth.update({ password: hash }, { where: { email: email } });

            res.json({
                status: 1,
            });
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
