import express = require('express');
import routes = require('./routes/index');
import user = require('./routes/user');
import http = require('http');
import path = require('path');
import fs = require('fs');

var io = require('socket.io')(http);
var bcrypt = require('brcypyjs');
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


import stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

io.on('connection', function(socket) {
    console.log('user connected');
    socket.on('disconnect', function(){
        console.log('user has disconnected');
    });
});

//$.post("/loginFunc.js",{ email1: email, password1:password},function(data)
/* app.post("/loginFunc.js", function (req, res) {
    let login = function(username, pswd) {
        MongoClient.connect("mongodb://95.85.17.152:27017/test", function(err, db) {
            if (err)
                throw err;

            var collection = db.collection('testeroni')
            collection.findOne({Username:username}, {Password: 1}, function(err, item){
                bcrypt.compare(pswd,item.Password, function(err, result) {
                    if (result == true) //Returnerar true/false
                    {
                        $data = 1;
                        console.log("Correct password");
                    }
                    else {
                        $data = 0;
                        console.log("Incorrect pasword");
                    }
                });
            });

        });
    }

}); */
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
    fs.readFile(__dirname + "/public/Admin/AdminHome.html", 'utf8',
        function (err, data) {
            res.contentType('html');
            res.send(data);
        });
});
//hej
app.get('/*.js', function (req, res) {
    fs.readFile(__dirname + "/public/Admin/" + req.url, 'utf8',
        function (err, data) {
            res.contentType('javascript');
            res.send(data);
        });
});
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
