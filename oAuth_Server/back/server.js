const express = require('express');
const router = require('./router');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const cors = require('cors');
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: '*',
        credentials: true,
    }),
);

app.use('/api', router);

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공!');
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(8000, (req, res) => {
    console.log('oauth server start 8000');
});