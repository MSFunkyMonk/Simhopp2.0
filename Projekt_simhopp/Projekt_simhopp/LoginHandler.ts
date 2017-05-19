import {cookieParser} from "express";
var bcrypt = require('bcryptjs');
var MongoClient = require('mongodb').MongoClient;

export class LoginHandler {
    socket: any = null;

    constructor(socket: any) {
        this.socket = socket;

        socket.on('login', function (username, pswd) {
                MongoClient.connect("mongodb://95.85.17.152:27017/simhopp", function (err, db) {
                    try {
                        if (err) { throw err; }

                        var collection = db.collection('Users')
                        collection.findOne({Username: username}, function (err, item) {
                            try {
                                bcrypt.compare(pswd, item.Password, function (err, result) {
                                    if (err) { throw err; }
                                    if (result == true) //Returnerar true/false
                                    {
                                        var destination = null;
                                        var conType = null;
                                        if (item.AccountType == 'Admin') {
                                            destination = '/Admin/AdminHome.html';
                                            conType = 'Admin';
                                        } else if (item.AccountType == 'Judge') {
                                            destination = '/Judge/Judge.html';
                                            conType = 'Judge';
                                        }
                                        socket.emit('redirect', destination, conType);
 
                                        console.log("correct password");
                                    } else {
                                        socket.emit('login unsuccessful');
                                        console.log("incorrect password");
                                    }
                                });
                            } catch (e) {
                                console.log('No entry in database');
                            }

                        });
                        } catch(e) {
                            console.log("Database connection error: " + e);
                        }
                    });


            });

        socket.on('register', function(username, pswd,name, email, accountType){
            bcrypt.hash(pswd, 10, function (err, hash) {
                try {
                    if (err) { throw err; }
                    MongoClient.connect('mongodb://95.85.17.152:27017/simhopp', function (err, db) {
                        try {
                            if (err) { throw err } ;

                                var collection = db.collection('Users');
                                var psswdDoc = {
                                    'Username': username,
                                    'Name': name,
                                    'E-mail': email,
                                    'Password': hash,
                                    'AccountType': accountType
                                };

                                    collection.findOne({Username: username}, {Username: 1}, function (err, result) {
                                        try {
                                            if (err) {throw err;}

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
                                        } catch(e) {
                                            console.log("Database search error: " + e);
                                        }
                                    });

                            } catch(e) {
                                console.log("Database connection error: " + e);
                            }
                            });

                } catch(e) {
                console.log("Hashing Error: " + e);
                }
                });

        });
    }
}