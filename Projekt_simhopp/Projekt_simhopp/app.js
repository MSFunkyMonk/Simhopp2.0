"use strict";
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var bcrypt = require('bcryptjs');
var MongoClient = require('mongodb').MongoClient;
var app = express();
// all environments
//app.set('port', process.env.PORT || 3000);
app.set('port', '3000');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
var stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/Judge', express.static(path.join(__dirname, 'public/Judge'))); //!!!Tillagt!!!
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
//app.get('/', routes.index);
//app.get('/users', user.list);
//app.get('/', function(req, res) {
//    fs.readFile(__dirname + "/public/index.html", 'utf8',
//        function(err, data) {
//            res.contentType('html');
//            res.send(data);
//        });
//});
app.get('/', function (req, res) {
    fs.readFile(__dirname + "/public/Admin/AdminHome.html", 'utf8', function (err, data) {
        res.contentType('html');
        res.send(data);
    });
});
app.get('/Judge', function (req, res) {
    fs.readFile(__dirname + "/public/Judge/Judge.html", 'utf8', function (err, data) {
        res.contentType('html');
        res.send(data);
    });
});
//app.get('/', function (req, res) {
//    fs.readFile(__dirname + "/public/Admin/index.html", 'utf8',
//        function (err, data) {
//            res.contentType('html');
//            res.send(data);
//        });
//});
//hej
app.get('/*.js', function (req, res) {
    fs.readFile(__dirname + "/public/Admin/" + req.url, 'utf8', function (err, data) {
        res.contentType('javascript');
        res.send(data);
    });
});
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
var io = require('socket.io')(server);
var admin = io.of('/admin');
var judge = io.of('/judge');
var AdminAdministration = null;
var JudgeAdministration = null;
io.on('connection', function (socket) {
    console.log('user connected');
    socket.on('disconnect', function () {
        console.log('user has disconnected');
    });
});
admin.on('connection', function (socket) {
    AdminAdministration = new AdminAdministration(socket);
});
judge.on('connection', function (socket) {
    JudgeAdministration = new JudgeAdministration(socket);
});
//# sourceMappingURL=app.js.map