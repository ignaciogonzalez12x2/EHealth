import web3 from './web3';

//const path = require("path");
//const fs = require("fs-extra"); // fs with extra functions

const HospitalFactory = require('./build/EHealth.json');

const instance = new web3.eth.Contract(
    HospitalFactory.abi,
    HospitalFactory.address
);

export default instance;