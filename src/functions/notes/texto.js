const env = require('../../../config/.env')


const textoPadraoEmail = 
(titulo) => {
	return (logo) => {
		return (textolink) => {
			return (link) => {
				return (texto1) => {
					return (texto2) => {
						const texto = `<!DOCTYPE html>
						<html lang="en">
						<head>
							<title>Making Accessible Emails</title>
							<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
							<meta name="viewport" content="width=device-width, initial-scale=1">
							<meta http-equiv="X-UA-Compatible" content="IE=edge" />
							<style type="text/css">
								/* CLIENT-SPECIFIC STYLES */
								body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
								table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
								img { -ms-interpolation-mode: bicubic; }
						
								/* RESET STYLES */
								img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
								table { border-collapse: collapse !important; }
								body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
							</style>
						</head>
						<body style="background-color: white; margin: 0 !important; padding: 60px 0 60px 0 !important;">
							<table border="0" cellspacing="0" cellpadding="0" role="presentation" width="100%">
							<tr>
								<td bgcolor="white" style="font-size: 0;">&​nbsp;</td>
								<td bgcolor="black" width="600" style="border-radius: 4px; color: grey; font-family: sans-serif; font-size: 18px; line-height: 28px; padding: 40px 40px;">
									<article>
									<h1 style="color: white; font-size: 32px; font-weight: bold; line-height: 36px; margin: 0 0 30px 0; text-align: center;">${titulo}</h1>
									<img alt="logo" src=${logo} height="300" width="600" style="background-color: black; color: #f8c433; display: block; font-family: sans-serif; font-size: 72px; font-weight: bold; height: auto; max-width: 10%; text-align: center; width: 100%;">
									<!-- Photo by Josh Nuttall on Unsplash -->
									<p style="margin: 30px 0 30px 0;">${texto1}</p>
									<p style="margin: 30px 0 30px 0; text-align: center;">
										<a href=${link} target="_blank" style="font-size: 18px; font-family: sans-serif; font-weight: bold; color: black; text-decoration: none; border-radius: 8px; -webkit-border-radius: 8px; background-color: #f8c433; border-top: 20px solid #f8c433; border-bottom: 18px solid #f8c433; border-right: 40px solid #f8c433; border-left: 40px solid #f8c433; display: inline-block;">${textolink}</a>
									</p>
									<p style="margin: 0 0 30px 0;">${texto2}</p>
									</article>
								</td>
								<td bgcolor="white" style="font-size: 0;">&​nbsp;</td>
							</tr>
							</table>
						</body>
						</html>`
						return texto
					}
				}
			}
		}
	}
}
const textoEmailEBCyberDef = textoPadraoEmail(env.titulo_email) (env.logo_email)(env.texto_link)(env.link_email)

const textoEmailAlertaIntrusao = textoEmailEBCyberDef('O sistema do Exército Brasileiro EBCyberDef recebeu um aviso de que sua conta foi invadida através de um ataque de Intrusão')
const textoEmailAlertaWorm = textoPadraoEmail(env.titulo_email)(env.logo_email_worm)(env.texto_link)(env.link_email)('O sistema do Exército Brasileiro EBCyberDef recebeu um aviso de que sua máquina foi infectada através de um malware Worm')
const textoEmailAlertaTrojan = textoPadraoEmail(env.titulo_email)(env.logo_email_trojan)(env.texto_link)(env.link_email)('O sistema do Exército Brasileiro EBCyberDef recebeu um aviso de que sua máquina foi infectada através de um malware Trojan')


const textoTelegram = 
(ataque) => {
	return (email) => {
		return (situacao) => {
			return (maquinas) => {
				const texto = `Relatorio sobre a o ataque: ${ataque}
Situação: ${situacao}
Email automático enviado para ${email}
Maquinas envolvidas no bloqueio do ataque: ${maquinas}`
				return texto
			}
		}
	}
}




const textoBot = (nome_adm_as, ip_atacante, email_adm_as, as_atacante, ip_bloqueado = '200.160.0.1') => {
    const texto = `Dados sobre a solicitação /GET ip do atacante ${ip_atacante}:
Foi realizado bloqueio do tráfego deste ip na(s) seguinte(s) máquina(s): ${ip_bloqueado}
Foi enviado email para o Sr ${nome_adm_as} (${email_adm_as}), responsável pelos pontos de acesso do ASN${as_atacante}, onde se encontra o atacante.`
    return texto
}




const textoTeste = textoEmailEBCyberDef('teste1')('teste2')


const textoEmail = (nome_adm_as, ip, as_atacante) => {

    const texto = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Making Accessible Emails</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            /* CLIENT-SPECIFIC STYLES */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
    
            /* RESET STYLES */
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
        </style>
      </head>
      <body style="background-color: white; margin: 0 !important; padding: 60px 0 60px 0 !important;">
        <table border="0" cellspacing="0" cellpadding="0" role="presentation" width="100%">
          <tr>
              <td bgcolor="white" style="font-size: 0;">&​nbsp;</td>
              <td bgcolor="black" width="600" style="border-radius: 4px; color: grey; font-family: sans-serif; font-size: 18px; line-height: 28px; padding: 40px 40px;">
                <article>
                  <h1 style="color: white; font-size: 32px; font-weight: bold; line-height: 36px; margin: 0 0 30px 0; text-align: center;">Notificação para ASN${as_atacante}</h1>
                  <img alt="Instituto Militar de Engenharia" src="http://www.ime.eb.mil.br/images/stories/logo.png" height="300" width="600" style="background-color: black; color: #f8c433; display: block; font-family: sans-serif; font-size: 72px; font-weight: bold; height: auto; max-width: 10%; text-align: center; width: 100%;">
                <!-- Photo by Josh Nuttall on Unsplash -->
                  <p style="margin: 30px 0 30px 0;">Nome do administrador do ASN${as_atacante}: ${nome_adm_as}</p>
                  <p style="margin: 30px 0 30px 0; text-align: center;">
                    <a href="http://www.ime.eb.mil.br/pt/" target="_blank" style="font-size: 18px; font-family: sans-serif; font-weight: bold; color: black; text-decoration: none; border-radius: 8px; -webkit-border-radius: 8px; background-color: #f8c433; border-top: 20px solid #f8c433; border-bottom: 18px solid #f8c433; border-right: 40px solid #f8c433; border-left: 40px solid #f8c433; display: inline-block;">SAIBA MAIS</a>
                  </p>
                  <p style="margin: 0 0 30px 0;">máquina de endereço ip ${ip} atacante</p>
                  <p style="margin: 0 0 30px 0;">Por ordem do Sr</p>
                </article>
              </td>
              <td bgcolor="white" style="font-size: 0;">&​nbsp;</td>
          </tr>
        </table>
      </body>
    </html>`
    return texto
}

const textoEmailIntrusao = 
(ip) => {
	return (port) => {
		return (usuario) => {
			const texto = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<title>Making Accessible Emails</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<style type="text/css">
					/* CLIENT-SPECIFIC STYLES */
					body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
					table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
					img { -ms-interpolation-mode: bicubic; }
			
					/* RESET STYLES */
					img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
					table { border-collapse: collapse !important; }
					body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
				</style>
			</head>
			<body style="background-color: white; margin: 0 !important; padding: 60px 0 60px 0 !important;">
				<table border="0" cellspacing="0" cellpadding="0" role="presentation" width="100%">
				<tr>
					<td bgcolor="white" style="font-size: 0;">&​nbsp;</td>
					<td bgcolor="black" width="600" style="border-radius: 4px; color: grey; font-family: sans-serif; font-size: 18px; line-height: 28px; padding: 40px 40px;">
						<article>
						<h1 style="color: white; font-size: 32px; font-weight: bold; line-height: 36px; margin: 0 0 30px 0; text-align: center;">EBCyberDef</h1>
						<img alt="Instituto Militar de Engenharia" src="http://www.ime.eb.mil.br/images/stories/logo.png" height="300" width="600" style="background-color: black; color: #f8c433; display: block; font-family: sans-serif; font-size: 72px; font-weight: bold; height: auto; max-width: 10%; text-align: center; width: 100%;">
						<!-- Photo by Josh Nuttall on Unsplash -->
						<p style="margin: 30px 0 30px 0;">O sistema do Exército Brasileiro EBCyberDef recebeu um aviso de que sua conta ${usuario} foi invadida</p>
						<p style="margin: 30px 0 30px 0; text-align: center;">
							<a href="http://www.ime.eb.mil.br/pt/" target="_blank" style="font-size: 18px; font-family: sans-serif; font-weight: bold; color: black; text-decoration: none; border-radius: 8px; -webkit-border-radius: 8px; background-color: #f8c433; border-top: 20px solid #f8c433; border-bottom: 18px solid #f8c433; border-right: 40px solid #f8c433; border-left: 40px solid #f8c433; display: inline-block;">verificar atividade</a>
						</p>
						<p style="margin: 0 0 30px 0;">IP da máquina utilizada: ${ip}:${port}, conta invadida: ${usuario}</p>
						<p style="margin: 0 0 30px 0;">Por ordem do Sr</p>
						</article>
					</td>
					<td bgcolor="white" style="font-size: 0;">&​nbsp;</td>
				</tr>
				</table>
			</body>
			</html>`
			return texto
		}
	}
}


module.exports = {
	textoEmail,
	textoEmailIntrusao,
	textoTeste,
	textoEmailAlertaIntrusao,
	textoEmailAlertaTrojan,
	textoEmailAlertaWorm,
	textoBot,
	textoTelegram
}

