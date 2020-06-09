const env = require('../.env')
const email = require('../functions/mail')
const ssh = require('../functions/ssh')
const rdap = require('../functions/rdap')
const notas = require('../notes/texto')
const telegram = require('../functions/telegram')


module.exports = app => {
 
    app.get('/denyofservice', async (req, res) => {


        let as_atacante = await rdap.encontrarAS(req.query.ip_atacante)
        let email_adm_as = await rdap.encontrarEmail(as_atacante)
        let nome_adm_as = await rdap.encontrarAdm(as_atacante)
        
        const texto = notas.textoEmail(nome_adm_as, req.query.ip_atacante, as_atacante)
        email.enviarEmail(env.emailDestinatario, texto) // mudar env.emailDestinatario para email_adm_as
        
        // ssh.bloqueioTrafego(env.hostRemoto, env.userRemoto, env.passRemoto, req.query.ip_atacante) 
        
        const textoTelegram = notas.textoBot(nome_adm_as, req.query.ip_atacante, email_adm_as, as_atacante, env.hostRemoto)
        telegram.msgGp(textoTelegram)

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1> API funcionando ${texto}\nEmail enviado para ${email_adm_as}</h1>`);


        // ssh.comandoRemoto(env.hostRemoto, env.userRemoto, env.passRemoto, 'ls')
        // email.enviarEmail(env.emailDestinatario, 'Boa noite')
        // let aux = await rdap.encontrarAS('201.17.89.75')
        // let aux = await rdap.encontrarEmail('28573')
        // let aux = await rdap.encontrarAdm('28573')
        // res.end(`<h1> API funcionando ${req.query.ip_atacante}</h1>`);
 
    });
    
}