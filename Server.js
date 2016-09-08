/// <reference path=".\NodeSnippet\typings\index.d.ts" />

var express = require('express');
var app = express();
var http = require('http');

var ser = http.createServer(app);
var io = require('socket.io')(ser);

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

//





