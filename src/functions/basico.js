const fs = require('fs')
const path = require('path')

function composicao(...fns) {
    return function(valor) {
        return fns.reduce(async (acc, fn) => {
            if(Promise.resolve(acc) === acc) {
                return fn(await acc)
            } else {
                return fn(acc)
            }
        }, valor)
    }
}

module.exports = {
    composicao
}