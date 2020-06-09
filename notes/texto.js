const env = require('../.env')

const textoEmail = (nome_adm_as, ip, as_atacante) => {// Senhor

    const texto = `Senhor ${nome_adm_as}, informo que a máquina de endereço ip ${ip} encontra-se realizando um ataque de negação de serviço em plataforma sob nossa 
    responsabilidade de proteção. 
Solicito ações devidas quanto a esse dano, bloqueando esse tráfego em seu ASN${as_atacante}
    
Informo que essa solicitação está sendo registrada no Núcleo de Informação e Coordenação do Ponto BR
    
Por ordem do Sr Chefe`
    return texto
}

const textoBot = (nome_adm_as, ip_atacante, email_adm_as, as_atacante, ip_bloqueado = '200.160.0.1') => {
    const texto = `Dados sobre a solicitação /GET ip do atacante ${ip_atacante}:
Foi realizado bloqueio do tráfego deste ip na(s) seguinte(s) máquina(s): ${ip_bloqueado}
Foi enviado email para o Sr ${nome_adm_as} (${email_adm_as}), responsável pelos pontos de acesso do ASN${as_atacante}, onde se encontra o atacante.`
    return texto
}

module.exports = {
    textoEmail,
    textoBot
}

