const nodemailer = require('nodemailer');
const env = require('../.env')

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

module.exports = {
    enviarEmail
}

