"use strict";
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LoginHandler = require('./LoginHandler');
const AdminHandler = require('./AdminHandler');
const JudgeHandler = require('./JudgeHandler');
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
const stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/Judge', express.static(path.join(__dirname, 'public/Judge')));  //!!!Tillagt!!!
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
//app.get('/', routes.index);
//app.get('/users', user.list);
app.get('/', function (req, res) {
    fs.readFile(__dirname + "/public/index.html", 'utf8', function (err, data) {
        res.contentType('html');
        res.send(data);
    });
});
//app.get('/', function (req, res) {
//    fs.readFile(__dirname + "/public/Judge/Judge.html", 'utf8',
//        function (err, data) {
//            res.contentType('html');
//            res.send(data);
//        });
//}); 
//app.get('/', function (req, res) {
//    fs.readFile(__dirname + "/public/Admin/index.html", 'utf8',
//        function (err, data) {
//            res.contentType('html');
//            res.send(data);
//        });
//});
//hej
/*app.get('/*.js', function (req, res) {
    fs.readFile(__dirname + "/public/Judge/" + req.url, 'utf8',
        function (err, data) {
            res.contentType('javascript');
            res.send(data);
        });
 }); */
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
var admin = io.of('/Admin');
var judge = io.of('/Judge');
io.on('connection', function (socket) {
    console.log('user connected');
    var loginHandler = new LoginHandler.LoginHandler(socket);
    socket.on('disconnect', function () {
        console.log('user has disconnected');
    });
});
admin.on('connection', function (socket) {
    var adminHandler = new AdminHandler.AdminHandler(socket);
});
judge.on('connection', function (socket) {
    var judgeHandler = new JudgeHandler.JudgeHandler(socket);
});
//# sourceMappingURL=app.js.map