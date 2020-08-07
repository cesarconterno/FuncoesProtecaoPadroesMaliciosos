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

const bloqueioTrafego = (host, user, pass, ip_atacante, ip_vitima, port_atacante=3000, port_vitima=3000, protocolo=icmp) => {

    var ssh = new SSH({
        host: host,
        user: user,
        pass: pass
    });
    
    ssh.exec(`sudo iptables -A FORWARD -s ${ip_atacante} --sport ${port_atacante} --dport ${port_vitima} -d ${ip_vitima} -j -p ${protocolo} DROP`, {
        pty: true,
        out: console.log.bind(console)
    }).start();

}

const bloqueioHost = (host, user, pass, ip_origem) => {

    var ssh = new SSH({
        host: host,
        user: user,
        pass: pass
    });

    // COMANDO IPTABLES BLOQUEAR IP
    ssh.exec(`sudo iptables -A OUTPUT -s ${ip_origem} -j DROP`, {
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
    var response
    ssh.exec(`traceroute -n ${ip} | egrep -o '[[:digit:]]{1,3}\.[[:digit:]]{1,3}\.[[:digit:]]{1,3}\.[[:digit:]]{1,3}' | sed -n 5p`, {
        pty: true,
        out: console.log.bind(console)
    }).start();
    return response
}

module.exports = {
    comandoRemoto,
    bloqueioTrafego,
    tracerouteRemoto,
    bloqueioHost
}

