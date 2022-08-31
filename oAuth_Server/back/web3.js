const Provider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const DID = require('./contracts/DID.json');
require('dotenv').config();

const provider = new Provider(process.env.MNEMONIC, process.env.OPTIMISM_GOERLI_URL);
const web3 = new Web3(provider);

const deployed = async () => {
    const networkId = await web3.eth.net.getId();
    const abi = DID.abi;
    const CA = DID.networks[networkId].address;

    const deploy = new web3.eth.Contract(abi, CA);

    return deploy;
};

module.exports = { deployed };

// const deployed = async () => {
//     const networkId = await web3.eth.net.getId();
//     const abi = DID.abi;
//     const CA = DID.networks[networkId].address;

//     const deploy = new web3.eth.Contract(abi, CA);

//     await deploy.methods.registerUser('test', DATA).send({ from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4' });

//     const result = await deploy.methods.getUser('test').call();

//     console.log(result);
// };

// deployed();
