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

const bloqueioTrafego = (host, user, pass, ip_atacante, ip_vitima) => {

    var ssh = new SSH({
        host: host,
        user: user,
        pass: pass
    });

    // COMANDO IPTABLES BLOQUEAR IP
    ssh.exec(`sudo iptables -A FORWARD -s ${ip_atacante} -d ${ip_vitima} -j DROP`, {
        pty: true,
        out: console.log.bind(console)
    }).start();

}

module.exports = {
    comandoRemoto,
    bloqueioTrafego
}

