var SSH = require('simple-ssh');
 
const comandoRemoto = (host, user, pass, text) => {

    var ssh = new SSH({
        host: host,
        user: user,
        pass: pass
    });
    ssh.exec(text, {
        pty: true,
        out: console.log.bind(console)
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

const tracerouteRemoto = async (host, user, pass, ip) => {

    var ssh = new SSH({
        host: host,
        user: user,
        pass: pass
    });
    
    ssh.exec(`traceroute -n ${ip} | egrep -o '[[:digit:]]{1,3}\.[[:digit:]]{1,3}\.[[:digit:]]{1,3}\.[[:digit:]]{1,3}' | sed -n 5p'`, {
        pty: true,
        out: console.log.bind(console)
    }).start();
    var response = await ssh.out
    //  traceroute -n 177.8.80.231 | egrep -o '[[:digit:]]{1,3}\.[[:digit:]]{1,3}\.[[:digit:]]{1,3}\.[[:digit:]]{1,3}' | sed -n 5p
    return response
}

module.exports = {
    comandoRemoto,
    bloqueioTrafego,
    tracerouteRemoto
}

