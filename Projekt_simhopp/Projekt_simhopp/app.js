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
io.on('connection', function (socket) {
    console.log('user connected');
    socket.on('disconnect', function () {
        console.log('user has disconnected');
    });
    socket.on('contest create', function (comp) {
        (function () {
            MongoClient.connect('mongodb://95.85.17.152:27017/test', function (err, db) {
                if (err) {
                    throw err;
                }
                db.createCollection(comp.nameOfCompetition);
                var compDoc = { 'Divers': comp.diverList, 'Numper of Jumps': comp.numberOfJumps, 'Number of Judges': comp.numberOfJudges };
                var collection = db.collection(comp.nameOfCompetition);
                collection.insert(compDoc, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("Competition created successfully");
                    }
                });
                //Glöm inte att lägga till mer information om det behövs!!!
                for (var i = 0; i < comp.diverList.length; i++) {
                    var diverDoc = { 'Name': comp.diverList[i].diverName, 'Nationality': comp.diverList[i].nationality };
                    collection.insert(diverDoc, function (err, result) {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log("Diver: " + comp.diverList[i].diverName + " added successfully to: " + comp.nameOfCompetition);
                        }
                    });
                }
            });
        })();
    });
});
//# sourceMappingURL=app.js.map