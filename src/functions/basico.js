const fs = require('fs')
const path = require('path')
const ssh = require('../functions/ssh')
const { match } = require('assert')

const lerDiretorio = (caminho) => {
    return new Promise((resolve, reject) => {
        try {
            const arquivos = fs.readdirSync(caminho).map(arquivo => {
                return path.join(caminho, arquivo)
            })
            resolve(arquivos)
        } catch (e) {
            reject(e)
        }
    })
}

const elementosTerminadosCom = (padraoTextual) => {
    return function (array) {
        return array.filter(el => el.endsWith(padraoTextual))
    }
}

const adicionarElementosSeIncluir = (padraoTextual) => {
    return function (array) {
        return array.filter(el => el.includes(padraoTextual))
    }
}

const lerArquivo = (caminho) => {
    return new Promise((resolve, reject) => {
        try {
            const conteudo = fs.readFileSync(caminho, { encoding: 'utf-8' })
            resolve(conteudo.toString())
        } catch (e) {
            reject(e)
        }
    })
}

const lerArquivos = (caminhos) => {
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}

const mesclarElementos = (array) => {
    return array.join(' ')
}

const separarTextoPor = (simbolo) => {
    return function (texto) {
        return texto.split(simbolo)
    }
}

const removerElementosSeVazio = (array) => {
    return array.filter(el => el.trim())
}

const ipValidoArray = (array) => {
    return array.filter(ip => ip.match(/\b(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b/))
}

const inserirIpRelatorio = (obj) => {
    return function (array) {
        return array.map(ip => {
            obj.relatorio.maquinas.push(ip)
            obj["relatorio"]["maquinas"].push(ip)
            console.log(ip)
            return ip
        })
    }
}

const saida = {
    relatorio: {
        ataque: "",
        situacao: "",
        maquinas: [
        ],
        notificacao_email: {
            asn: "",
            adm: "",
            email: ""
        },
        notificacao_telegram: {
            bot: ""
        }
    }
}


const saida_editavel = {
    relatorio: {
        ataque: "",
        situacao: "",
        maquinas: [
        ],
        notificacao: {
            email: "",
            telegram: ""
        }
    }
}

module.exports = {
    lerDiretorio,
    elementosTerminadosCom,
    adicionarElementosSeIncluir,
    lerArquivos,
    mesclarElementos,
    separarTextoPor,
    removerElementosSeVazio,
    ipValidoArray,
    inserirIpRelatorio,
    saida,
    saida_editavel
}