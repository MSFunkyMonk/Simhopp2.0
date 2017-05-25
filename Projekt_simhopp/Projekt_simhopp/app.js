"use strict";
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var LoginHandler = require('./LoginHandler');
var AdminHandler = require('./AdminHandler');
var JudgeHandler = require('./JudgeHandler');
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
//app.use(express.cookieParser());
//app.use('/Judge', express.static(path.join(__dirname, 'public/Judge')));  //!!!Tillagt!!!
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
app.get('/', function (req, res) {
    fs.readFile(__dirname + "/public/index.html", 'utf8', function (err, data) {
        res.contentType('html');
        res.send(data);
    });
});
app.get('/*.js', function (req, res) {
    fs.readFile(__dirname + "/public/" + req.url, 'utf8', function (err, data) {
        res.contentType('javascript');
        res.send(data);
    });
});
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
var io = require('socket.io')(server);
//io.use(cookieParser());
var admin = io.of('/Admin');
var judge = io.of('/Judge');
io.on('connection', function (socket) {
    console.log('User has connected');
    var loginHandler = new LoginHandler.LoginHandler(socket);
    socket.on('disconnect', function () {
        console.log('user has disconnected');
    });
});
admin.on('connection', function (socket) {
    var adminHandler = new AdminHandler.AdminHandler(socket);
    console.log("i admin connection!");
    socket.on('comp info', function (competitionName, diver, jump) {
        console.log('Sending diver information to judge');
        judge.emit('diveInfo', competitionName, diver, jump);
    });
});
judge.on('connection', function (socket) {
    var judgeHandler = new JudgeHandler.JudgeHandler(socket);
    socket.on('score from judge', function (data) {
        console.log('Recieved score from judge');
        admin.emit('reciving data', data);
    });
});
//# sourceMappingURL=app.js.map