const fs = require('fs')
const path = require('path')
const ssh = require('../functions/ssh')

function lerDiretorio(caminho) {
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

function elementosTerminadosCom(padraoTextual) {
    return function (array) {
        return array.filter(el => el.endsWith(padraoTextual))
    }
}

function adicionarElementosSeIncluir(padraoTextual) {
    return function (array) {
        return array.filter(el => el.includes(padraoTextual))
    }
}

function lerArquivo(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const conteudo = fs.readFileSync(caminho, { encoding: 'utf-8' })
            resolve(conteudo.toString())
        } catch (e) {
            reject(e)
        }
    })
}

function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}

function mesclarElementos(array) {
    return array.join('\n')
}

function separarTextoPor(simbolo) {
    return function (texto) {
        return texto.split(simbolo)
    }
}

function removerElementosSeVazio(array) {
    return array.filter(el => el.trim())
}

const ipValidoArray = (array) => {
    return array.filter(ip => /\b(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b/.test(ip))
}

function executarBloqueioArray(ip_atacante) {
    return function (array) {
        return array.map(ip => ssh.bloqueioDeAtacanteParaTodos(ip_atacante))
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
    executarBloqueioArray
}