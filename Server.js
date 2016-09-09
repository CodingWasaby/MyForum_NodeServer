/// <reference path=".\NodeSnippet\typings\index.d.ts" />

var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var ser = http.createServer(app);
var io = require('socket.io')(ser);

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

var router = express.Router();
router.get('/', function (req, res) {
    res.render('test1', { title: 'Express' });
})

app.use('/', router);