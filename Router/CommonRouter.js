var express = require('express');
var router = express.Router();
var config = require('../Tools/Config');
var userDAL = require('../DAL/UserDAL');
var mail = require('../Tools/MailTools');
var crypto = require('../Tools/CryptoTools');

exports.router = router;

router.get('/Index', function (req, res) {
    res.render('index', { title: '分众传媒' });
});

router.get('/Login', function (req, res) {
    res.render('Login', { title: '登录' });
});

router.get('/test1', function (req, res) {
    res.render('test1', { title: '分众传媒' });
});

router.get('/ChangePassword', function (req, res) {
    console.log(req);
})

/*-------------------------- */

router.post('/LoginSubmit', function (req, res) {    
    var user = userDAL();
    var param = { UserNo: req.body.userName, Password: req.body.password };
    user.UserLogin(param, function (result) {
        if (result) {
            param.CreateTime = Date.now().toString();
            var loginUser = {
                LoginName: crypto.encrypt(param.UserNo),
                Password: crypto.encrypt(param.Password),
                flag: crypto.encrypt(param.CreateTime)
            }
            res.cookie("loginUser", loginUser);
            res.send(true);
        }
        else
            res.send(false);
    })
});

router.post('/SendMail', function (req, res) {
    var user = userDAL();
    user.GetUserByEmail(req.body.Email, function (result1) {
        if (result1) {
            var mails = {
                from: 'zhaoxi@framedia.net',
                to: req.body.Email,
                subject: '重新设置您的密码 FROM 分众',
                text: 'test',
                html: `<b>这是一封系统发送邮件,请勿回复。</b></br>
                       <span>请点击右侧链接---->  </span>
                       <a href='http://localhost:3000/login' > 修改密码 </a>`
            };
            mail.sendMail(mails, function (result2) {
                if (result2)
                    res.send('success');
                else
                    res.send('false');
            })
        }
        else {
            res.send('NotFound');
        }
    })
})

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};