const env = require('../.env')
const email = require('./mail')
const ssh = require('./ssh')
const rdap = require('./rdap')

module.exports = app => {
 
    app.get('/', async (req, res) => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
    

        
        // ssh.bloqueioTrafego(env.hostRemoto, env.userRemoto, env.passRemoto, req.query.ip_atacante, '187.68.7.6')
        // ssh.comandoRemoto(env.hostRemoto, env.userRemoto, env.passRemoto, 'sudo iptables -L') // precisa do sudo
        var aux = ssh.tracerouteRemoto(env.hostRemoto, env.userRemoto, env.passRemoto, '201.17.89.75') // precisa do sudo

        // email.enviarEmail(env.emailDestinatario, 'Boa noite')
        // let aux = await rdap.encontrarAS('201.17.89.75')
      
        // res.end(`<h1> API funcionando ${req.query.ip_atacante}</h1>`);
        await res.end(`<h1> API funcionando ${aux}</h1>`);
 
    });
    
};