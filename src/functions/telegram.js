const env = require('../../config/.env')
const fetch = require('node-fetch');


const msg = async (msg) => {
    const response = await fetch(`https://api.telegram.org/bot${env.token}/sendMessage?chat_id=${env.client_id}&text=${encodeURI(msg)}`);
    const myJson = await response.json(); 
    console.log('telegram enviado')
    return;
}


const msgGp = async (msg) => {
    const response = await fetch(`https://api.telegram.org/bot${env.token}/sendMessage?chat_id=${env.chat_id}&text=${encodeURI(msg)}`);
    const myJson = await response.json(); 
    console.log(myJson.nicbr_autnum)
    return myJson.nicbr_autnum;
}

module.exports = {
    msg,
    msgGp

}