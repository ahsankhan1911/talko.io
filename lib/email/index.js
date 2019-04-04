
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD // generated ethereal password
    }
  });
 
 exports.sendVerificationEmail  =  function (to, from ,code){
  
    let mailOptions = {
      to: to, // list of receivers
      from: from, // sender address
      subject: "Please verify your email", // Subject line
      text: `Use ${code} to verify your account with Talko`, // plain text body
      // html: "<b>Hello world?</b>" // html body
    };
  
    // send mail with defined transport object
      return transporter.sendMail(mailOptions)
  }
  