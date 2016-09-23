var express = require('express');
var router = express.Router();
var config = require('../Tools/Config');
var userDAL = require('../DAL/UserDAL');

router.get('/Index', function (req, res) {
    console.log(req.cookies.body);
    res.render('index', { title: '分众传媒' });
});

router.get('/Login', function (req, res) {
    res.render('Login', { title: '登录' });
});

router.get('/test1', function (req, res) {
    res.render('test1', { title: '分众传媒' });
});

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

})

exports.router = router;