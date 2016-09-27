var express = require('express');
var router = express.Router();
var config = require('../Tools/Config');
var userDAL = require('../DAL/UserDAL');
var mail = require('../Tools/MailTools');

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

/*-------------------------- */

router.post('/LoginSubmit', function (req, res) {
    var user = userDAL();
    var param = { UserNo: req.body.userName, Password: req.body.password };
    user.UserLogin(param, function (result) {
        if (result) {
            res.cookie("body", req.body);
            res.send(true);
        }
        else
            res.send(false);
    })
});

router.post('/SendMail', function (req, res) {
    var user = userDAL();
    user.GetUserByEmail(req.body.Email, function (result) {
        if (result) {
            var mails = {
                from: 'zhaoxi@framedia.net', 
                to: req.body.Email, 
                subject: '重新设置您的密码 FROM 分众',
                text: 'test', 
                html: `<b>Hello world </b>
                       <a href='http://localhost:3000/login' >修改密码</a>`
            };
            mail.sendMail(mails, function (result) {
                if (result)
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