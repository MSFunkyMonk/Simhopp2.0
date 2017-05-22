"use strict";
var bcrypt = require('bcryptjs');
var MongoClient = require('mongodb').MongoClient;
var LoginHandler = (function () {
    function LoginHandler(socket) {
        this.socket = null;
        this.socket = socket;
        socket.on('login', function (username, pswd) {
            MongoClient.connect("mongodb://95.85.17.152:27017/simhopp", function (err, db) {
                try {
                    if (err) {
                        throw err;
                    }
                    var collection = db.collection('Users');
                    collection.findOne({ Username: username }, function (err, item) {
                        try {
                            bcrypt.compare(pswd, item.Password, function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                if (result == true) {
                                    var destination = {
                                        dest: "",
                                        conType: ""
                                    };
                                    if (item.AccountType == 'Admin') {
                                        destination.dest = '/Admin/AdminHome.html';
                                        destination.conType = 'Admin';
                                    }
                                    else if (item.AccountType == 'Judge') {
                                        destination.dest = '/Judge/Judge.html';
                                        destination.conType = 'Judge';
                                    }
                                    socket.emit('redirect', destination);
                                    console.log("correct password");
                                }
                                else {
                                    socket.emit('login unsuccessful');
                                    console.log("incorrect password");
                                }
                            });
                        }
                        catch (e) {
                            console.log('No entry in database');
                        }
                    });
                }
                catch (e) {
                    console.log("Database connection error: " + e);
                }
            });
        });
        socket.on('register', function (username, pswd, name, email, accountType) {
            bcrypt.hash(pswd, 10, function (err, hash) {
                try {
                    if (err) {
                        throw err;
                    }
                    MongoClient.connect('mongodb://95.85.17.152:27017/simhopp', function (err, db) {
                        try {
                            if (err) {
                                throw err;
                            }
                            ;
                            var collection = db.collection('Users');
                            var psswdDoc = {
                                'Username': username,
                                'Name': name,
                                'E-mail': email,
                                'Password': hash,
                                'AccountType': accountType
                            };
                            collection.findOne({ Username: username }, { Username: 1 }, function (err, result) {
                                try {
                                    if (err) {
                                        throw err;
                                    }
                                    if (result == null) {
                                        collection.insert(psswdDoc, { w: 1 }, function (err, result) {
                                        });
                                        console.log("New user created successfully");
                                    }
                                    else if (result.Username == username) {
                                        console.log("User already exists");
                                    }
                                    else {
                                        collection.insert(psswdDoc, { w: 1 }, function (err, result) {
                                        });
                                        console.log("New user created successfully");
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
                catch (e) {
                    console.log("Hashing Error: " + e);
                }
            });
        });
    }
    return LoginHandler;
}());
exports.LoginHandler = LoginHandler;
//# sourceMappingURL=LoginHandler.js.map