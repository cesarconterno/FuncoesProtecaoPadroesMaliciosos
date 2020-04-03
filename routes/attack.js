let NeDB = require('nedb');
let db = new NeDB({
    filename:'maquinas.db',
    autoload:false
});


module.exports = app => {

    let route = app.route('/attack');

    route.post((req, res) => {

        //if (!app.utils.validator.attack(app, req, res)) return false;

        if(req.body.type == 'DOS'){
            if(req.body.subtype == 'flood'){

                let aux = new String(req.body.ip_destiny);
                aux = '/ip/' + aux;
                app.utils.rdap.send(req, res, aux);  
            }
        }
    });

   
};
