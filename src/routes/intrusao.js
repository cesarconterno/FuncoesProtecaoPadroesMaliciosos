const env = require('../../config/.env')
const ssh = require('../functions/ssh')
const rdap = require('../functions/rdap')
const notas = require('../functions/notes/texto')
const telegram = require('../functions/telegram')
const fs = require('fs');
const {ip_valido, ip_publico, emailValido} = require('../functions/verificacao')
const {enviarEmailPadrao} = require('../functions/mail')
const f = require('../functions/basico')
const path = require('path')
const caminho = path.join(__dirname, '..', '..', 'database')



module.exports = app => {
 
    app.get('/intrusao', async (req, res) => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');

        const saida = f.saida
        saida.relatorio.ataque = "intrusao"

        const ip_vitima = ip_publico(ip_valido(req.query.ip_vitima))
        const usuario_vitima = req.query.usuario_vitima
        const email_vitima = emailValido(req.query.email_vitima)
        const informacoesEmail = `IP da máquina invadida: ${ip_vitima}, conta invadida: ${usuario_vitima}`
        const linha_iptables = `sudo iptables -A FORWARD -s ${ip_vitima} -j  DROP`


        try{
            enviarEmailPadrao(env.emailDestinatario)(notas.textoEmailAlertaIntrusao(informacoesEmail))('Alerta de Segurança')
            const as_vitima = await rdap.encontrarAS(req.query.ip_vitima)
            const comando = ssh.comandoRemoto(linha_iptables)(env.userRemoto)(env.passRemoto)(env.hostRemoto)
            
            f.lerDiretorio(caminho)
                .then(f.elementosTerminadosCom('.txt'))
                .then(f.adicionarElementosSeIncluir(as_vitima))
                .then(f.lerArquivos)
                .then(f.mesclarElementos)
                .then(f.separarTextoPor('\n'))
                .then(f.removerElementosSeVazio)
                .then(f.ipValidoArray)
                .then(comando)
                .then(array => {
                    return array.map(ip => {
                        // saida.relatorio.maquinas.push(ip)
                        console.log(ip)
                        return ip
                    })
                })
                .then(console.log)

            saida.relatorio.situacao = "sucesso"
            // saida.relatorio.maquinas.push(ip_vitima)
            saida.relatorio.notificacao_email.adm = usuario_vitima
            saida.relatorio.notificacao_email.email = email_vitima
            saida.relatorio.notificacao_email.asn = as_vitima
            // console.log(eee)
        }catch(e){
            saida.relatorio.situacao = "falha"
            res.end(`${JSON.stringify(saida)}`)
            console.error(e)
        }
        res.end(`${JSON.stringify(saida)}`) 
    });
    
}