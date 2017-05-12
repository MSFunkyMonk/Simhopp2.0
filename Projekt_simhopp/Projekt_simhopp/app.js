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
//app.use('/Judge', express.static(path.join(__dirname, 'public/Judge')));  //!!!Tillagt!!!
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
//app.get('/', routes.index);
//app.get('/users', user.list);
/*app.get('/', function(req, res) {
    fs.readFile(__dirname + "/public/index.html", 'utf8',
        function(err, data) {
            res.contentType('html');
            res.send(data);
        });
}); */
app.get('/', function (req, res) {
    fs.readFile(__dirname + "/public/Admin/AdminHome.html", 'utf8', function (err, data) {
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
var AdminHandler = null;
var JudgeHandler = null;
var LoginHandler = null;
io.on('connection', function (socket) {
    console.log('user connected');
    //LoginHandler = new LoginHandler(socket);
    /*
        socket.on('login', function (username, pswd) {
            MongoClient.connect("mongodb://95.85.17.152:27017/simhopp", function (err, db) {
                if (err)
                    throw err;
    
                var collection = db.collection('Users')
                collection.findOne({Username: username}, function (err, item) {
                    bcrypt.compare(pswd, item.Password, function (err, result) {
                        if (result == true) //Returnerar true/false
                        {
                            var destination = null;
                            if (item.AccountType == 'Admin') {
                                destination = '/public/Admin/AdminHome.html';
                            } else if (item.AccountType == 'Judge') {
                                destination = '/public/Judge/Judge.html';
                            }
                            socket.emit('redirect', destination);
                            console.log("correct password");
                        }
                        else {
                            socket.emit('login unsuccessful');
                            console.log("incorrect password");
                        }
                    });
                });
    
            });
    
        });
    
        socket.on('register', function (username, pswd, email, accountType) {
            bcrypt.hash(pswd, 10, function (err, hash) {
                MongoClient.connect('mongodb://95.85.17.152:27017/simhopp', function (err, db) {
                    if (err)
                        throw err;
    
                    var collection = db.collection('Users');
                    var psswdDoc = {'Username': username, 'E-mail': email, 'Password': hash, 'AccountType': accountType};
                    collection.findOne({Username: username}, {Username: 1}, function (err, result) {
                        if (err)
                            throw err;
    
                        if (result == null) {
                            collection.insert(psswdDoc, {w: 1}, function (err, result) {
                            });
                            console.log("New user created successfully");
                        } else if (result.Username == username) {
                            console.log("User already exists");
                        } else {
                            collection.insert(psswdDoc, {w: 1}, function (err, result) {
                            });
                            console.log("New user created successfully");
                        }
    
                    });
                });
            });
        });
    
        socket.on('disconnect', function () {
            console.log('user has disconnected');
        });
    */
    socket.on('contest create', function (comp) {
        console.log('data recieved ' + comp.diverList[0].jumpList[0].difficulty);
        MongoClient.connect('mongodb://95.85.17.152:27017/simhopp', function (err, db) {
            if (err) {
                throw err;
            }
            db.createCollection(comp.nameOfCompetition);
            var collection = db.collection(comp.nameOfCompetition);
            var _loop_1 = function(i) {
                var difficultList = [comp.diverList[i].jumpList[0].difficulty];
                for (var j = 1; i < comp.diverList[i].jumpList.length; j++) {
                    difficultList.push(comp.diverList[i].jumpList[j].difficulty);
                }
                var diverDoc = {
                    'Name': comp.diverList[i].diverName,
                    'Nationality': comp.diverList[i].nationality,
                    'Jumps': comp.diverList[i].jumpList,
                    'Difficulty': difficultList,
                    'Points': [],
                    'Total points': 0
                };
                collection.insert(diverDoc, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("Diver: " + comp.diverList[i].diverName + " added successfully to: " + comp.nameOfCompetition);
                    }
                });
            };
            for (var i = 0; i < comp.diverList.length; i++) {
                _loop_1(i);
            }
            var compDoc = {
                'CompetitionName': comp.nameOfCompetiton,
                'NumberOfJumps': comp.numberOfJumps,
                'NumberOfJudges': comp.numberOfJudges
            };
            collection.insert(compDoc, function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    console.log("Competition created successfully");
                }
            });
            //Glöm inte att lägga till mer information om det behövs!!!
        });
    });
});
admin.on('connection', function (socket) {
    AdminHandler = new AdminHandler(socket);
});
judge.on('connection', function (socket) {
    JudgeHandler = new JudgeHandler(socket);
});
//# sourceMappingURL=app.js.map