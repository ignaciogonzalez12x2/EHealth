import web3 from './web3';

const Hospital = require('./build/EHealth.json');

export default (address) => {
    return new web3.eth.Contract(
        Hospital.abi,
        address
    );
}