var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var ser = http.createServer(app);
var io = require('socket.io')(ser);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
//app.set('view engine', 'html');
app.set('view engine', 'jade');

io.on('connection', function (client) {
    console.log('connection');
    client.on('Send', function (data) {
        io.emit('Send', { aa: 'aa' });
    });
    client.on('event', function (data) {
        console.log(data);
    });
    client.on('disconnect', function () {
        console.log('disconnect');
    });
});
ser.listen(3000);

var CommonRouter = require('./Router/CommonRouter');
app.use('/', CommonRouter.router);

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

// var uuid = require('node-uuid');
// console.log(uuid.v4());