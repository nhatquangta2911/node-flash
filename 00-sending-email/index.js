const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
      user: 'nhatquangta2911@gmail.com',
      password: 'samplesample'
   }
});

var mailOptions = {
   from: 'Quang (Shawn) N. TA',
   to: 'aye2992911@gmail.com',
   subject: 'Demostration',
   text: 'Please do not reply to this email',
   html: '<p style="color: red;">You have got a new email</p>'
};

transporter.sendMail(mailOptions);