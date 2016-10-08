var crypto = require('../Tools/CryptoTools');

function registeAll(app) {
    /*登录验证*/
    app.use(function (req, res, next) {
        var urlpath = req._parsedUrl.pathname.toUpperCase();
        if (urlpath != "/Login".toUpperCase() && urlpath != '/ChangePassword'.toUpperCase() && req.method != "POST") {
            if (!req.cookies.loginUser) {
                res.redirect("/Login");
                return;
            }
            var loginUser = req.cookies.loginUser;
            var CreateTime = new Date(parseInt(crypto.decrypt(loginUser.flag)));
            var timeSpan = Date.now() - CreateTime;
            var numb = (timeSpan / (1000 * 60 * 60 * 24));
            //超过一天需要重新登录
            if (numb > 1) {
                res.clearCookie('loginUser');
                res.redirect("/login");
                return;
            }
            loginUser.flag = crypto.encrypt(Date.now().toString());
            res.cookie('loginUser', loginUser);
        }
        next();
    });


    var CommonRouter = require('./CommonRouter');
    app.use('/', CommonRouter.router);

    var WorkflowRouter = require('./WorkflowRouter');
    app.use('/Workflow/', WorkflowRouter.router);


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