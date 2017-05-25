"use strict";
var MongoClient = require('mongodb').MongoClient;
var AdminHandler = (function () {
    function AdminHandler(socket) {
        this.socket = null;
        this.socket = socket;
        var self = this;
        socket.on('contest create', function (comp) {
            MongoClient.connect('mongodb://95.85.17.152:27017/simhopp', function (err, db) {
                try {
                    if (err) {
                        throw err;
                    }
                    db.createCollection(comp.nameOfCompetition);
                    var collection = db.collection(comp.nameOfCompetition);
                    var _loop_1 = function(i) {
                        var difficultList = [comp.diverList[i].jumpList[0].difficulty];
                        for (var j = 1; j < comp.diverList[i].jumpList.length; j++) {
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
                            try {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    console
                                        .log("Diver: " +
                                        comp.diverList[i].diverName +
                                        " added successfully to: " +
                                        comp.nameOfCompetition);
                                }
                            }
                            catch (e) {
                                console.log("Error inserting diver document number " + i + " : " + e);
                            }
                        });
                    };
                    for (var i = 0; i < comp.diverList.length; i++) {
                        _loop_1(i);
                    }
                    var compDoc = {
                        'CompetitionName': comp.nameOfCompetition,
                        'NumberOfJumps': comp.numberOfJumps,
                        'NumberOfJudges': comp.numberOfJudges
                    };
                    collection.insert(compDoc, function (err, result) {
                        try {
                            if (err) {
                                throw err;
                            }
                            else {
                                console.log("Competition created successfully");
                            }
                        }
                        catch (e) {
                            console.log("Error inserting competition document: " + e);
                        }
                    });
                }
                catch (e) {
                    console.log("Database connection error: " + e);
                }
            });
        });
        //socket.on('active competition',
        //    function(contestName) {
        //        MongoClient.connect('mongodb://95.85.17.152:27017/simhopp',
        //            function(err, db) {
        //                try {
        //                    if (err) {
        //                        throw err;
        //                    }
        //                    var collection = db.collection('activeContest');
        //                    collection.findAndModify({ 'Name': { $exists: true } },
        //                        { $set: { Name: contestName } },
        //                        function(err, document) {
        //                            try {
        //                                if (err) {
        //                                    throw err;
        //                                }
        //                            } catch (e) {
        //                                console.log("Database search error: " + e);
        //                            }
        //                        });
        //                } catch (e) {
        //                    console.log("Database connection error: " + e);
        //                }
        //            });
        //    });
    }
    AdminHandler.prototype.compStart = function (comp) {
        console.log("i compStart");
    };
    return AdminHandler;
}());
exports.AdminHandler = AdminHandler;
//# sourceMappingURL=AdminHandler.js.map