var crypto = require('../Tools/CryptoTools');

function registeAll(app) {

    /*登录验证*/
    app.use(function (req, res, next) {
        if (req.method == "POST") {
            next();
            return;
        }
        var url = req.originalUrl;
        if (url != "/login" && url != "/ChangePass") {
            if (!req.cookies.loginUser)
                return res.redirect("/login");

            var loginUser = req.cookies.loginUser;
            var CreateTime = new Date(parseInt(crypto.decrypt(loginUser.flag)));
            var timeSpan = Date.now() - CreateTime;
            //超过一天需要重新登录
            if (parseInt(timeSpan / (1000 * 60 * 60 * 24)) > 0) {
                req.cookies.loginUser = null;
                return res.redirect("/login");
            }
            loginUser.flag = crypto.encrypt(Date.now().toString());
            res.cookie('loginUser', loginUser);
        }
        next();
    });


    var CommonRouter = require('./CommonRouter');
    app.use('/', CommonRouter.router);


    /*异常处理*/
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}



exports.registeAll = registeAll;