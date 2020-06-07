const env = require('../.env')
const fetch = require('node-fetch');
// const nodemailer = require('nodemailer');


const encontrarAS = async (ip) => {
    const response = await fetch(`https://rdap.registro.br/ip/${ip}`);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson.nicbr_autnum)
    return myJson.nicbr_autnum;
}

module.exports = {
    encontrarAS
}

