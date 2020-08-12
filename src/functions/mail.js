const nodemailer = require('nodemailer');
const env = require('../../config/.env')



//servico_email
const enviarEmail = (to, text) => {

    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: env.emailRemetente,
          pass: env.senhaEmailRemetente 
        }
      });
      
    const mailOptions = {
        from: 'auxiliar86.desenvolvimento@gmail.com',
        to: to,
        subject: 'Aviso do módulo de Defesa do EBCyberDef',
        html: text
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}

const enviarEmailPadrao = 
(destinatario) => {
    return (texto) => {
        return (assunto) => {
				const transporter = nodemailer.createTransport({
					service: `${env.servico_email}`,
					auth: {
					user: env.emailRemetente,
					pass: env.senhaEmailRemetente 
					}
				});
				
				const mailOptions = {
					from: `${env.emailRemetente}`,
					to: destinatario,
					subject: `${assunto}`,
					html: texto
					};
				
				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
					console.log(error);
					return false
					} else {
					console.log('Email enviado: ' + info.response);
					return true
					}
				}); 
        }
    }
}

module.exports = {
    enviarEmail,
    enviarEmailPadrao
}

