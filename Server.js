var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var ser = http.createServer(app);
var io = require('socket.io')(ser);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("test"));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'jade');

var RouteRegister = require('./Router/RouteRegister');
RouteRegister.registeAll(app);

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







// var uuid = require('node-uuid');
// console.log(uuid.v4());

// var mail = require('./Tools/MailTools');
// mail.sendTest();