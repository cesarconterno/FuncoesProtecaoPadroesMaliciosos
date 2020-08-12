const env = require('../../config/.env')
const email = require('../functions/mail')
const ssh = require('../functions/ssh')
const rdap = require('../functions/rdap')
const notas = require('../functions/notes/texto')
const regex = require('../functions/notes/regex')
const telegram = require('../functions/telegram')
const nedb = require('nedb');
const fs = require('fs');
const {ip_valido, ip_publico, emailValido} = require('../functions/verificacao')
const {composicao} = require('../functions/basico')
const {enviarEmailPadrao} = require('../functions/mail')


module.exports = app => {
 
    app.get('/intrusao', async (req, res) => {

        const ip_vitima = ip_publico(ip_valido(req.query.ip_vitima))
        const port_vitima = req.query.port_vitima
        const usuario_vitima = req.query.usuario_vitima
        const email_vitima = emailValido(req.query.email_vitima)

        // enviarEmailPadrao(env.emailDestinatario)(notas.textoEmailIntrusao(ip_vitima)(port_vitima)(usuario_vitima))('Alerta de Segurança')
        
        enviarEmailPadrao(env.emailDestinatario)(notas.textoEmailAlerta)('Alerta de Segurança')

        res.end(`<h1> API funcionando, ${ip_vitima}, ${port_vitima}, ${usuario_vitima}, ${email_vitima}</h1>`);
       
        
      
    });
    
}