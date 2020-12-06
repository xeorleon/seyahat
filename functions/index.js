const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();
//app sendgrid
//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
let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "apikey",
      pass: "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"
    }
  });
  
  exports.sendMail = functions.https.onRequest((request , response)=>{
      const email_from = request.query.email_from;
      const message =  request.query.message;

      const mailOptions = {
          from: 'Seyahat Hazinesi <xeorleon@gmail.com>',
          to : 'xeorleon@gmail.com',
          subject: "Seyahat Hazinesi İletişim Formu",
          html: `${message} <br><br> Gönderen ${email_from}`
      }
      transporter.sendMail(mailOptions,(error, info)=>{
        if(error){
            console.log(`ERROR: (mail) ${email_from} --- (message) ${message} --- (error) ${error.toString()}`);
            response.send(error.toString());
        }
        response.send("Mesajınız Gönderildi.");
      })
  })