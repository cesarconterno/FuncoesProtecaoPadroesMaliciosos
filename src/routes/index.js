const env = require('../../config/.env')
const email = require('../functions/mail')
const ssh = require('../functions/ssh')
const rdap = require('../functions/rdap')
const f = require('../functions/basico')
const path = require('path')

const caminho = path.join(__dirname, '..', '..', 'database')

module.exports = app => {
 
    app.get('/', async (req, res) => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        const ip_vitima = '31.31.31.31'
        const ip_atacante = '12.23.34.45'
        const asn = '28576'



        f.lerDiretorio(caminho)
            .then(f.elementosTerminadosCom('.txt'))
            .then(f.adicionarElementosSeIncluir(asn))
            .then(f.lerArquivos)
            .then(f.mesclarElementos)
            .then(f.separarTextoPor('\n'))
            .then(f.removerElementosSeVazio)
            .then(f.ipValidoArray)
            // .then(f.executarBloqueioArray(ip_atacante))
            .then(console.log)
        
        // ssh.bloqueioTrafego(env.hostRemoto, env.userRemoto, env.passRemoto, req.query.ip_atacante, '187.68.7.6')
        // ssh.comandoRemoto(env.hostRemoto, env.userRemoto, env.passRemoto, 'sudo iptables -L') // precisa do sudo
        // var aux
        // ssh.tracerouteRemoto(env.hostRemoto, env.userRemoto, env.passRemoto, '201.17.89.75')
        //     .then(resposta => aux = resposta)
        
        // precisa do sudo

        // email.enviarEmail(env.emailDestinatario, 'Boa noite')
        // let aux = await rdap.encontrarAS('201.17.89.75')
      
        // res.end(`<h1> API funcionando ${req.query.ip_atacante}</h1>`);
        res.end(`<h1> API funcionando</h1>`);
 
    });
    
};