const env = require('../../config/.env')


const ip_valido = (ip) => {
    if(/\b(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b/.test(ip)){
        return ip
    }else{
        return "1"
    }
}

const ip_publico = (ip) => {
    if(ip == "1") return "IP inválido"
    if(/\b(?!(10)|192\.168|172\.(2[0-9]|1[6-9]|3[0-1])|(25[6-9]|2[6-9][0-9]|[3-9][0-9][0-9]|99[1-9]))[0-9]{1,3}\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/.test(ip)){
        return ip
    }else{
        return "IP privado"
    }
}

const emailValido = (email) =>{
    if(/\b[\w.]+\@[\w.]+\b/.test(email)){
        return email
    }else{
        return null
    }
}


module.exports = {
    ip_publico,
    ip_valido,
    emailValido
}