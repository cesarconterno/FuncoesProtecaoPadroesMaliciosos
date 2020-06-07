const env = require('../.env')
const email = require('./mail')
const ssh = require('./ssh')
const rdap = require('./rdap')

module.exports = app => {
 
    app.get('/', async (req, res) => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
    

        // ssh.comandoRemoto(env.hostRemote, env.userRemote, env.passRemote, 'ls')
        // ssh.bloqueioTrafego(env.hostRemote, env.userRemote, env.passRemote, req.query.ip_atacante)
        // email.enviarEmail(env.emailDestinatario, 'Boa noite')
        let aux = await rdap.encontrarAS('201.17.89.75')
      
        // res.end(`<h1> API funcionando ${req.query.ip_atacante}</h1>`);
        res.end(`<h1> API funcionando ${aux}</h1>`);
 
    });
    
};