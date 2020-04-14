module.exports = {

    command: (req, res, line, hostMachine = '192.168.0.28', userMachine = 'cesar', passMachine = '123456')=> {
        var SSH = require('simple-ssh');

        var ssh = new SSH({
            host: hostMachine,
            user: userMachine,
            pass: passMachine
        });

        ssh.exec(line, {
            out: function(stdout) {
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(stdout);
            }
        }).start();      
                

    }
};

