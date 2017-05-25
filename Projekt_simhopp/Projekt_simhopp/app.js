"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var path = require("path");
var fs = require("fs");
var LoginHandler = require("./LoginHandler");
var AdminHandler = require("./AdminHandler");
var JudgeHandler = require("./JudgeHandler");
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
var stylus = require("stylus");
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
    //console.log("i admin connection!");
    //socket.on('comp info', function (comp){
    //    console.log('Sending diver information to judge');
    //    judge.emit('diveInfo', comp);
    //});
    socket.on('start contest', function (contestName) {
        console.log("i start contest");
        console.log(contestName);
        var Comp = { nameOfCompetition: "", numberOfJumps: 0, numberOfJudges: 0, diverList: [], jumpList: [], difficultyList: [] };
        MongoClient.connect("mongodb://95.85.17.152:27017/simhopp", function (err, db) {
            try {
                if (err) {
                    throw err;
                }
                var collection = db.collection(contestName);
                collection.findOne({ 'CompetitionName': contestName }, function (err, document) {
                    try {
                        if (err) {
                            throw err;
                        }
                        console.log(document.CompetitionName);
                        Comp.nameOfCompetition = document.CompetitionName;
                        Comp.numberOfJumps = document.NumberOfJumps;
                        Comp.numberOfJudges = document.NumberOfJudges;
                        console.log(Comp.nameOfCompetition);
                    }
                    catch (e) {
                        console.log("Database search error: " + e);
                    }
                });
                collection.find({ 'Name': { $exists: true } }, { _id: 0 }).each(function (err, document) {
                    try {
                        if (err) {
                            throw err;
                        }
                        if (document !== null && document.Name !== null) {
                            console.log("Collection found: " + document.Name + " " + document.Jumps + " " + document.Difficulty);
                            Comp.diverList.push(document.Name);
                            console.log(Comp.diverList[0]);
                            Comp.jumpList.push(document.Jumps);
                            console.log(Comp.jumpList[0][0].jumpCode);
                            Comp.difficultyList.push(document.Difficulty);
                            console.log(JSON.stringify(Comp.difficultyList));
                            //self.compStart(Comp);
                            judge.emit('diveInfo', Comp);
                            console.log("förbi judge.emit");
                            MongoClient.connect('mongodb://95.85.17.152:27017/simhopp', function (err, db) {
                                try {
                                    if (err) {
                                        throw err;
                                    }
                                    var collection = db.collection('activeContest');
                                    collection.findAndModify({ 'Name': { $exists: true } }, [['_id', 'asc']], { $set: { Name: Comp.nameOfCompetition } }, function (err, document) {
                                        try {
                                            if (err) {
                                                throw err;
                                            }
                                        }
                                        catch (e) {
                                            console.log("Database search error: " + e);
                                        }
                                    });
                                }
                                catch (e) {
                                    console.log("Database connection error: " + e);
                                }
                            });
                        }
                    }
                    catch (e) {
                        console.log("Error finding diver documents" + e);
                    }
                });
            }
            catch (e) {
                console.log("Database connection error: " + e);
            }
        });
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