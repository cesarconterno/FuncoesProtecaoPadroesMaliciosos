var SSH = require('simple-ssh')
const env = require('../../config/.env')
 
const comandoRemoto = 
(comando) => {
    return (user) => {
        return (pass) => {
            return (host) => {
                return (array) => {
                    return array.map(ip => {
                        var ssh = new SSH({
                            host: host,
                            user: user,
                            pass: pass
                        });
                        
                        ssh.exec(`${comando}`, {
                            pty: true,
                            out: console.log.bind(console)
                        }).start();
                        return ip
                    })   
                }                         
            }
        }
    }
}

const bloqueioTrafego = (host, user, pass, ip_atacante, ip_vitima) => {

    var ssh = new SSH({
        host: host,
        user: user,
        pass: pass
    });
    
    ssh.exec(`sudo iptables -A FORWARD -s ${ip_atacante} -d ${ip_vitima} -j DROP`, {
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

const bloqueioPadraoTrafego = 
(host) => {
    return (user) => {
        return (pass) => {
            return (ip_vitima) => {
                return (ip_atacante) =>{
                    var ssh = new SSH({
                        host: host,
                        user: user,
                        pass: pass
                    });
                    
                    ssh.exec(`sudo iptables -A FORWARD -s ${ip_atacante} -d ${ip_vitima} -j  DROP`, {
                        pty: true,
                        out: console.log.bind(console)
                    }).start();
                                            
                }
            }
        }
    }
}

const bloqueioTrafegoIpAtacante = 
(host) => {
    return (user) => {
        return (pass) => {
            return (ip_atacante) =>{
                var ssh = new SSH({
                    host: host,
                    user: user,
                    pass: pass
                });
                
                ssh.exec(`sudo iptables -A FORWARD -s ${ip_atacante} -j  DROP`, {
                    pty: true,
                    out: console.log.bind(console)
                }).start();                          
            }
        }
    }
}

const bloqueioTrafegoIpDePara = bloqueioPadraoTrafego(env.hostRemoto)(env.userRemoto)(env.passRemoto)
const bloqueioDeAtacanteParaTodos = bloqueioTrafegoIpAtacante(env.hostRemoto)(env.userRemoto)(env.passRemoto)

module.exports = {
    comandoRemoto,
    bloqueioTrafego,
    tracerouteRemoto,
    bloqueioHost,
    bloqueioTrafegoIpDePara,
    bloqueioDeAtacanteParaTodos
}

