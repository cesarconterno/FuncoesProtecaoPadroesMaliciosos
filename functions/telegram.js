const env = require('../.env')
const fetch = require('node-fetch');


const msg = async (token, client_id, msg) => {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${client_id}&text=${encodeURI(msg)}`);
    const myJson = await response.json(); 
    console.log(myJson.nicbr_autnum)
    return myJson.nicbr_autnum;
}


const msgGp = async (token, chat_id, msg) => {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURI(msg)}`);
    const myJson = await response.json(); 
    console.log(myJson.nicbr_autnum)
    return myJson.nicbr_autnum;
}

module.exports = {
    msg,
    msgGp

}