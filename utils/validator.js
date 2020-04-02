module.exports = {

    attack:(app, req, res)=>{

        req.assert('ip_source', 'O ip de origem é obrigatório.').notEmpty();
        req.assert('ip_destiny', 'O ip de destino é obrigatório.').notEmpty();

        let errors = req.validationErrors();

        if (errors) {

            app.utils.error.send(errors, req, res);
            return false;

        } else {

            return true;

        }

    }

};