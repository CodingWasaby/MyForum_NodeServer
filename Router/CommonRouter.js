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
    if (req.query.u) {
        res.clearCookie("loginUser");
    }
    res.render('Login', { title: '登录' });
});

router.get('/test1', function (req, res) {
    res.render('test1', { title: '分众传媒' });
});

router.get('/ChangePassword', function (req, res) {
    var info = crypto.decrypt(req.query.u);
    var queryString = info.split('_');
    var userKey = queryString[0];
    var sendTime = new Date(parseInt(queryString[1]));
    var password = queryString[2];
    var timeSpan = Date.now() - sendTime;
    var tp = parseInt(timeSpan / (1000 * 60))
    //链接过期
    if (tp > 30) {
        var err = { message: 'error', status: 410 };
        res.status(err.status);
        res.render('error', {
            message: err.message,
            error: err
        });
    }
    else {
        var user = userDAL();
        //判断是否修改过密码
        user.GetUserByKey(userKey, function (result) {
            if (result.Password === password) {
                res.render('ChangePassword', { title: '重置密码', userKey: userKey, Password: result.Password });
            }
            else {
                var err = { message: 'error', status: 410 };
                res.status(err.status);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
        })
    }
})

/*-------------------------- */

router.post('/LoginSubmit', function (req, res) {
    var user = userDAL();
    var param = { UserNo: req.body.userName, Password: req.body.password };
    user.UserLogin(param, function (result, userDom) {
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
    user.GetUserByEmail(req.body.Email, function (result1, UserKey, Password) {
        if (result1) {
            var html = `<b>这是一封系统发送邮件,请勿回复。</b></br>
                       <span>请点击右侧链接---->  </span>
                       <a href='http://localhost:3000/ChangePassword?u={0}' > 修改密码 </a></br>
                       <b>请您在30分钟内执行操作。</b> ` ;
            var u = crypto.encrypt(UserKey + '_' + Date.now().toString() + '_' + Password);
            html = html.StringFormat(u);
            var mails = {
                from: 'zhaoxi@framedia.net',
                to: req.body.Email,
                subject: '重新设置您的密码 FROM 分众',
                text: 'mail',
                html: html
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

router.post('/ChangePassword', function (req, res) {
    var user = userDAL();
    user.UpdatePassword(req.body.userKey, req.body.pass1, function (result) {
        if (result) {
            var loginUser = {
                LoginName: crypto.encrypt(req.body.userKey),
                Password: crypto.encrypt(req.body.pass1),
                flag: crypto.encrypt(Date.now().toString())
            }
            res.cookie("loginUser", loginUser);
            res.send(true);
        }
        else
            res.send(false);
    })
});

/*----------------------------------- */

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};


String.prototype.StringFormat = function () {
    if (arguments.length == 0) {
        return this;
    }
    for (var StringFormat_s = this, StringFormat_i = 0; StringFormat_i < arguments.length; StringFormat_i++) {
        StringFormat_s = StringFormat_s.replace(new RegExp("\\{" + StringFormat_i + "\\}", "g"), arguments[StringFormat_i]);
    }
    return StringFormat_s;
};