module.exports = app => {

    let route = app.route('/test');

    var as1 = {
        autNum: "2715",
        ip: ["200.156.10.5", "200.20.6.7", "200.6.41.4"]
    };
    var as2 = {
        autNum: "28573",
        ip: ["200.189.80.7", "200.160.96.8", "201.6.3.9", "201.17.2.3"]
    };
    var as3 = {
        autNum: "22085",
        ip: ["200.169.112.2", "201.23.160.3", "189.92.2.4", "189.24.3.5", "187.68.7.6"]
    };

    route.get((req, res) => {

        // app.utils.searchIP.insertMaqs(req, res, as1); //inserir IPs do AS
        // app.utils.searchIP.findMaqs(req, res, '200.20.6.7'); // encontrar IP em algum AS
        // app.utils.searchIP.removeAS(req, res, '2715');

        // app.utils.rdap.send(req, res, '/ip/200.20.6.7'); // envia um ip e retorna o seu AS
        
        app.utils.ssh.command(req, res, 'uname -o'); //retorna o echo solicitado

    });

   
};