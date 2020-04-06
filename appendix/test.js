module.exports = app => {

    let route = app.route('/test');

    route.get((req, res) => {

        // app.utils.searchIP.insertMaqs(req, res); //inserir IPs do AS
        app.utils.searchIP.findMaqs(req, res); // encontrar IP em algum AS
        // app.utils.searchIP.removeAS(req, res);
    });

   
};