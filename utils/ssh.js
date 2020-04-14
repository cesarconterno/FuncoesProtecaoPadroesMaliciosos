module.exports = {

    traceroute: (req, res, command = 'echo "ok"')=> {
        var SSH = require('simple-ssh');

        var ssh = new SSH({
            host: '192.168.0.28',
            user: 'cesar',
            pass: '123456'
        });

        ssh.exec(command, {
            out: function(stdout) {
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(stdout);
            }
        }).start();      
                

    }
};

