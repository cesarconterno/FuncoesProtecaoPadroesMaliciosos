const env = require('../../config/.env')
const email = require('../functions/mail')
const ssh = require('../functions/ssh')
const rdap = require('../functions/rdap')
const notas = require('../functions/notes/texto')
const regex = require('../functions/notes/regex')
const telegram = require('../functions/telegram')
const nedb = require('nedb');
const fs = require('fs');



module.exports = app => {
 
    app.get('/denyofservice', async (req, res) => {

      

        if(regex.ip_valido(req.query.ip_atacante)){
            console.log('ip valido')
            if(regex.ip_publico(req.query.ip_atacante)){
                console.log('ip publico')
                var db = new nedb({filename: './database/maq.db', autoload: true});
                let as_atacante = await rdap.encontrarAS(req.query.ip_atacante)
                let email_adm_as = await rdap.encontrarEmail(as_atacante)
                let nome_adm_as = await rdap.encontrarAdm(as_atacante)
                
                let saida = 
                `IP do atacante: ${req.query.ip_atacante}\nASN${as_atacante}\nNome Adm AS: ${nome_adm_as}, email: ${email_adm_as}\n`
            
                const texto = notas.textoEmail(nome_adm_as, req.query.ip_atacante, as_atacante)
                email.enviarEmail(env.emailDestinatario, texto) // mudar env.emailDestinatario para email_adm_as
        
                

                db.find({ ASN: `${'28573'}` }, async function (err, maq) {
                    if(err)return console.log(err);
        
                    ssh.comandoRemoto(maq[0].ip, maq[0].user, maq[0].pass, 'echo $PATH')
                    ssh.bloqueioTrafego(maq[0].ip, maq[0].user, maq[0].pass, req.query.ip_atacante, req.query.ip_vitima) 
        
                    const textoTelegram = notas.textoBot(nome_adm_as, req.query.ip_atacante, email_adm_as, as_atacante, maq[0].ip)
                    telegram.msgGp(textoTelegram)
                });

                
        
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/json');
                res.end(`${JSON.stringify(saida)}`) 

                
         


            }else{
                console.log('ip privado')
                res.json('IP privado')
            }
        }else{
            console.log('ip nao valido')
            res.json('IP não válido')
        }

      
        
      
    });
    
}