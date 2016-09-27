var nodemailer = require('nodemailer');
var config = require('./Config');
var transporter = nodemailer.createTransport(config.MailConfig);

var mailOptions = {
    from: 'zhaoxi@framedia.net', // sender address
    to: '363023619@qq.com', // list of receivers
    subject: 'Helloaaaa ✔', // Subject line
    //text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

exports.sendTest = function () {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    })
};

exports.sendMail = function (mail, callback) {
    transporter.sendMail(mail, function (error, info) {
        if (error) {
            callback(false);
        }
        callback(true);
    })
};
