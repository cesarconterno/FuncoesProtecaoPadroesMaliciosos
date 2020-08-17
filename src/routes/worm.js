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
const {enviarEmailPadrao} = require('../functions/mail')
const f = require('../functions/basico')
const path = require('path')
const { rejects } = require('assert')
const caminho = path.join(__dirname, '..', '..', 'database')



module.exports = app => {
 
    app.get('/worm', async (req, res) => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');

        const saida =f.saida
        saida.relatorio.ataque = "worm"
        saida.relatorio.maquinas = []

        const ip_vitima = ip_publico(ip_valido(req.query.ip_vitima))
        const usuario_vitima = req.query.usuario_vitima
        const email_vitima = emailValido(req.query.email_vitima)
        const informacoesEmail = `IP da máquina infectada: ${ip_vitima}, usuario: ${usuario_vitima}`
        try{
            enviarEmailPadrao(env.emailDestinatario)(notas.textoEmailAlertaWorm(informacoesEmail))('Alerta de Segurança')
            saida.relatorio.situacao = "neutralizado"
            saida.relatorio.maquinas.push(ip_vitima)
            saida.relatorio.notificacao_email.adm = usuario_vitima
            saida.relatorio.notificacao_email.email = email_vitima
            const informacoesTelegram = notas.textoTelegram('worm')(email_vitima)('neutralizado')(ip_vitima)
            telegram.msgGp(informacoesTelegram)
            saida.relatorio.notificacao_telegram.bot = env.nome_bot
        }catch(e){
            saida.relatorio.situacao = "falha"
            const informacoesTelegram = notas.textoTelegram('worm')('email não enviado')('falha')(ip_vitima)
            telegram.msgGp(informacoesTelegram)
            res.end(`${JSON.stringify(saida)}`)
            console.error(e)
        }
        console.log(saida)
        res.end(`${JSON.stringify(saida)}`)  
    });
}