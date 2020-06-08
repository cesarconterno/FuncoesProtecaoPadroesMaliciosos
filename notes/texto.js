const env = require('../.env')

const textoEmail = (nome_adm_as, ip) => {

    const texto = `Senhor ${nome_adm_as}, ip atacante: ${ip}`
    return texto
}

const textoBot = (nome_adm_as, ip, email_adm_as) => {
    const texto = `Olá pessoal\n${nome_adm_as}\n${ip}\n${email_adm_as}`
    return texto
}

module.exports = {
    textoEmail,
    textoBot
}

