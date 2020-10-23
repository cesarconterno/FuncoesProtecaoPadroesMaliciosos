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
 
    app.get('/editavel', async (req, res) => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');

        // argumentos: nome_ataque, ip_vitima, ip_atacante, tipo_bloqueio, usuario_vitima, email_vitima

        const saida = f.saida_editavel
        saida.relatorio.maquinas = []
        saida.relatorio.ataque = req.query.nome_ataque
        const ip_vitima = ip_publico(ip_valido(req.query.ip_vitima))
        const ip_atacante = ip_publico(ip_valido(req.query.ip_atacante))    
        
        const tipo_bloqueio = req.query.tipo_bloqueio
        const usuario_vitima = req.query.usuario_vitima
        const email_vitima = emailValido(req.query.email_vitima)

        const informacoesEmail = `Ataque: ${req.query.nome_ataque}`

        let as_bloqueio = ''
        let as_bloqueio2 = ''
      
        const linha_iptables = `sudo iptables -A FORWARD -s ${ip_atacante} -j  DROP`
        
        const inserirIP = f.inserirIpRelatorio(saida)

        try{
            
            if(tipo_bloqueio == 'próximo do atacante'){
                as_bloqueio = await rdap.encontrarAS(ip_atacante)
                as_bloqueio2 = 'sem bloqueio'
            }
            if(tipo_bloqueio == 'próximo da vítima'){
                as_bloqueio = await rdap.encontrarAS(ip_vitima)
                as_bloqueio2 = 'sem bloqueio'
            }
            if(tipo_bloqueio == 'próximo de ambos'){
                as_bloqueio = await rdap.encontrarAS(ip_atacante)
                as_bloqueio2 = await rdap.encontrarAS(ip_vitima)
            }
            if(tipo_bloqueio == 'sem bloqueio'){
                as_bloqueio = 'sem bloqueio'
                as_bloqueio2 = 'sem bloqueio'
            }
            const comando = ssh.comandoRemoto(linha_iptables)(env.userRemoto)(env.passRemoto)(env.hostRemoto)
            
            const ips = await f.lerDiretorio(caminho)
                .then(f.elementosTerminadosCom('.txt')) 
                .then(f.adicionarElementosSeIncluir(as_bloqueio)) 
                // .then(f.adicionarElementosSeIncluir(as_bloqueio2)) 
                .then(f.lerArquivos) 
                .then(f.mesclarElementos) 
                .then(f.separarTextoPor('\n')) 
                .then(f.mesclarElementos) 
                .then(f.separarTextoPor(' ')) 
                .then(f.ipValidoArray) 
                .then(comando) 

            console.log(ips)
            saida.relatorio.maquinas.push(ips)

            saida.relatorio.notificacao.email = email_vitima
            
            
            if(ips.length > 0){
                saida.relatorio.situacao = "neutralizado"
            }else if(tipo_bloqueio == 'sem bloqueio'){
                saida.relatorio.situacao = "orientado"
            }else{
                saida.relatorio.situacao = "falha"
            }
            
            enviarEmailPadrao(env.emailDestinatario)(notas.textoEmailAlertaEditavel(informacoesEmail))('Alerta de Segurança')
            const informacoesTelegram = notas.textoTelegram(saida.relatorio.ataque)(email_vitima)(saida.relatorio.situacao)(`${JSON.stringify(ips, null)}`)
            telegram.msgGp(informacoesTelegram)
            saida.relatorio.notificacao.telegram = env.nome_bot
            // console.log(eee)
        }catch(e){
            saida.relatorio.situacao = "falha"
            const informacoesTelegram = notas.textoTelegram(saida.relatorio.ataque)('email não enviado')('falha')(`${JSON.stringify(ips, null)}`)
            telegram.msgGp(informacoesTelegram)
            res.end(`${JSON.stringify(saida)}`)
            console.error(e)
        }
        res.end(`${JSON.stringify(saida)}`) 
    });
    
}