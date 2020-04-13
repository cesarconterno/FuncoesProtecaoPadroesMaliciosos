module.exports = app => {

    var SSH = require('simple-ssh');
 
    var ssh = new SSH({
        host: 'REMOTE_IP',
        user: 'USER',
        pass: 'PASSWORD'
    });
    

    let route = app.route('/ssh');

    route.get((req, res) => {
        ssh.exec('echo $PATH', {
            out: function(stdout) {
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(stdout);
            }
        }).start();
        
    });


    
   
   
};

