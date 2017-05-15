"use strict";
var bcrypt = require('bcryptjs');
var MongoClient = require('mongodb').MongoClient;
var LoginHandler = (function () {
    function LoginHandler(socket) {
        this.socket = null;
        this.socket = socket;
        socket.on('login', function (username, pswd) {
            MongoClient.connect("mongodb://95.85.17.152:27017/simhopp", function (err, db) {
                if (err)
                    throw err;
                var collection = db.collection('Users');
                collection.findOne({ Username: username }, function (err, item) {
                    bcrypt.compare(pswd, item.Password, function (err, result) {
                        if (result == true) {
                            var destination = null;
                            if (item.AccountType == 'Admin') {
                                destination = '/public/Admin/AdminHome.html';
                            }
                            else if (item.AccountType == 'Judge') {
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
                    var psswdDoc = { 'Username': username, 'E-mail': email, 'Password': hash, 'AccountType': accountType };
                    collection.findOne({ Username: username }, { Username: 1 }, function (err, result) {
                        if (err)
                            throw err;
                        if (result == null) {
                            collection.insert(psswdDoc, { w: 1 }, function (err, result) { });
                            console.log("New user created successfully");
                        }
                        else if (result.Username == username) {
                            console.log("User already exists");
                        }
                        else {
                            collection.insert(psswdDoc, { w: 1 }, function (err, result) { });
                            console.log("New user created successfully");
                        }
                    });
                });
            });
        });
    }
    return LoginHandler;
}());
exports.LoginHandler = LoginHandler;
//# sourceMappingURL=LoginHandler.js.map