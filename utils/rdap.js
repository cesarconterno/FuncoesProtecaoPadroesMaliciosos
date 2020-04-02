module.exports = {
    send: (req, res, path)=>{

        var restify = require('restify-clients');
        var assert = require('assert');

        var client = restify.createJsonClient({

            url:'https://rdap.registro.br'
        });

        client.get(path, function(err, request, response, obj) {
            assert.ifError(err);
            // res.json(obj);
            res.end(obj.handle); // retorna a rede do ip
        });

    } 
};