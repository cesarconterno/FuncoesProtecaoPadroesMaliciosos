const env = require('../.env')
const email = require('../functions/mail')
const ssh = require('../functions/ssh')
const rdap = require('../functions/rdap')
const notas = require('../notes/texto')
const telegram = require('../functions/telegram')

const nedb = require('nedb');



module.exports = app => {
 
    app.get('/denyofservice', async (req, res) => {

        
        var db = new nedb({filename: './database/maq.db', autoload: true});
        let as_atacante = await rdap.encontrarAS(req.query.ip_atacante)
        let email_adm_as = await rdap.encontrarEmail(as_atacante)
        let nome_adm_as = await rdap.encontrarAdm(as_atacante)
    
        const texto = notas.textoEmail(nome_adm_as, req.query.ip_atacante, as_atacante)
        email.enviarEmail(env.emailDestinatario, texto) // mudar env.emailDestinatario para email_adm_as

        db.find({ ASN: `${as_atacante}` }, async function (err, maq) {
            if(err)return console.log(err);

            ssh.comandoRemoto(maq[0].ip, maq[0].user, maq[0].pass, 'echo $PATH')
            ssh.bloqueioTrafego(maq[0].ip, maq[0].user, maq[0].pass, req.query.ip_atacante) 

            const textoTelegram = notas.textoBot(nome_adm_as, req.query.ip_atacante, email_adm_as, as_atacante, maq[0].ip)
            telegram.msgGp(textoTelegram)
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1> API funcionando
        IP do acatante: ${req.query.ip_atacante}
        ASN${as_atacante}
        Nome Adm AS: ${nome_adm_as}, email: ${email_adm_as}</h1>`);

 
    });
    
}