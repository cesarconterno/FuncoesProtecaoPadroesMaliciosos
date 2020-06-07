var SSH = require('simple-ssh');
 
const comandoRemoto = (host, user, pass, text) => {

    var ssh = new SSH({
        host: host,
        user: user,
        pass: pass
    });
     
    ssh.exec(text, {
        out: function(stdout) {
            console.log(stdout);
        }
    }).start();
    
}

const bloqueioTrafego = (host, user, pass, ip) => {

    var ssh = new SSH({
        host: host,
        user: user,
        pass: pass
    });

    ssh.exec(`sudo echo ${ip} bloqueado`, {
        pty: true,
        out: console.log.bind(console)
    }).start();
     
    // ssh.exec(`sudo iptables -t filter -A INPUT -s ${ip} -j DROP`, {
    //     pty: true,
    //     out: console.log.bind(console)
    // }).start();

}

module.exports = {
    comandoRemoto,
    bloqueioTrafego
}

