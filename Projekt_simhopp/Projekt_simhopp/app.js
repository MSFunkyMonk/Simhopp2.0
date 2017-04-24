"use strict";
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
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
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
//$.post("/loginFunc.js",{ email1: email, password1:password},function(data)
/* app.post("/loginFunc.js", function (req, res) {

}) */
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
app.get('/*.js', function (req, res) {
    fs.readFile(__dirname + "/public/Admin/" + req.url, 'utf8', function (err, data) {
        res.contentType('javascript');
        res.send(data);
    });
});
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
//# sourceMappingURL=app.js.map