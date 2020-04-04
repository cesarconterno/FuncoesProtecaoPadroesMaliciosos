module.exports = {

    attack:(app, req, res)=>{

        req.assert('ip_source', 'O ip de origem é obrigatório.').notEmpty();
        req.assert('ip_destiny', 'O ip de destino é obrigatório.').notEmpty();
        req.assert('type', 'O tipo de ataque é obrigatório.').notEmpty();
        req.assert('subtype', 'O sub-tipo de ataque é obrigatório.').notEmpty();

        let errors = req.validationErrors();

        if (errors) {
            app.utils.error.send(errors, req, res);
            return false;
        } else {
            return true;
        }

    }

};