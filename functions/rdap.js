const env = require('../.env')
const fetch = require('node-fetch');



const encontrarAS = async (ip) => {
    const response = await fetch(`https://rdap.registro.br/ip/${ip}`);
    const myJson = await response.json(); 
 
    console.log(myJson.nicbr_autnum)
    return myJson.nicbr_autnum;
}

const encontrarAdm = async (as) => {
    const response = await fetch(`https://rdap.registro.br/autnum/${as}`);
    const myJson = await response.json(); 
    console.log(myJson.entities[0].entities[0].vcardArray[1][2][3])
    return myJson.entities[0].entities[0].vcardArray[1][2][3];

}


const encontrarEmail = async (as) => {
    const response = await fetch(`https://rdap.registro.br/autnum/${as}`);
    const myJson = await response.json(); 
    console.log(myJson.entities[0].entities[0].vcardArray[1][3][3])
    return myJson.entities[0].entities[0].vcardArray[1][3][3];

}

module.exports = {
    encontrarAS,
    encontrarAdm,
    encontrarEmail
}