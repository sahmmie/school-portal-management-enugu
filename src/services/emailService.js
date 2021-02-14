import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from '../config';


    const transporter = nodemailer.createTransport(smtpTransport({
        //service: config.emailService.service,
        host: "smtp.hostinger.com",//config.emailService.host,
        port: 587,//config.emailService.port,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "no-reply@femaleandmore.org",//config.emailService.auth_username, 
          pass: "Femaleandmore8000"//config.emailService.auth_password 
        }
      }));
    
      const emailService = async (to, subject, text) =>{
        let info = await transporter.sendMail({
            from: '"Female and More" <no-reply@femaleandmore.org>',
            to,
            subject,
            html: text
          });
      
    
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default emailService;
