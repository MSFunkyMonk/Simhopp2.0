"use strict";
var MongoClient = require('mongodb').MongoClient;
var AdminHandler = (function () {
    function AdminHandler(socket) {
        this.socket = null;
        this.socket = socket;
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
                                    console.log("Diver: " + comp.diverList[i].diverName + " added successfully to: " + comp.nameOfCompetition);
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
            socket.emit('start contest', comp.nameOfCompetition);
        });
        socket.on('start contest', function (contestName) {
            console.log("i start contest");
            var comp = null;
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
                            comp.competitionName = document.CompetitionName;
                            comp.numberOfJumps = document.NumberOfJumps;
                            comp.numberOfJudges = document.NumberOfJudges;
                        }
                        catch (e) {
                            console.log("Database search error: " + e);
                        }
                    });
                    //Glöm EJ testa!!!!!
                    collection.find({ 'Name': { $exists: true } }, { _id: 0 }).each(function (err, document) {
                        try {
                            if (err) {
                                throw err;
                            }
                            console.log("Collection found: " + document.Name + " " + document.Jumps + " " + document.Difficulty);
                            comp.diverList.push(document.Name);
                            comp.jumpList.push(document.Jumps);
                            comp.difficultyList.push(document.Difficulty);
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
            console.log("i start contest!");
            socket.emit('active competition');
            this.AdminHandler.startCompetition(comp);
        });
        socket.on('store score', function (score, competitionName, diverName) {
            MongoClient.connect('mongodb://95.85.17.152:27017/simhopp', function (err, db) {
                try {
                    if (err) {
                        throw err;
                    }
                    var collection = db.collection(competitionName);
                    collection.findAndModify({ 'Name': diverName }, { $push: { Points: score } }, function (err, result) {
                        try {
                            if (err) {
                                throw err;
                            }
                        }
                        catch (e) {
                            console.log("Error with find and update operation: " + e);
                        }
                    });
                }
                catch (e) {
                    console.log("Database connection error: " + e);
                }
            });
        });
        socket.on('store total score', function (competitionName, diverName) {
            MongoClient.connect('mongodb://95.85.17.152:27017/simhopp', function (err, db) {
                try {
                    if (err) {
                        throw err;
                    }
                    var collection = db.collection(competitionName);
                    collection.findOne({ 'Name': diverName }, function (err, document) {
                        try {
                            if (err) {
                                throw err;
                            }
                            var totalScore = null;
                            for (var i in document.Points) {
                                totalScore += i;
                            }
                            collection.findAndModify({ 'Name': diverName }, { $set: { TotalScore: totalScore } }, function (err, result) {
                                try {
                                    if (err) {
                                        throw err;
                                    }
                                }
                                catch (e) {
                                    console.log("Data find and modify operation error: " + e);
                                }
                            });
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
        });
        socket.on('active competition', function (contestName) {
            MongoClient.connect('mongodb://95.85.17.152:27017/simhopp', function (err, db) {
                try {
                    if (err) {
                        throw err;
                    }
                    var collection = db.collection('activeContest');
                    collection.findAndModify({ 'Name': { $exists: true } }, { $set: { Name: contestName } }, function (err, document) {
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
        });
    }
    AdminHandler.prototype.startCompetition = function (comp) {
        //ej helt klar!
        var status = "";
        while (comp == null) {
            this.socket.on('contest data retrieved', function (data) {
                comp = data;
            });
        }
        this.socket.emit('status', "Tävlingen startade");
        console.log("Tävling startade!");
        var pointList;
        for (var turn = 0; turn < comp.numberOfJumps; turn++) {
            //omgång
            var i = 0;
            for (var diver = 0; diver < comp.diverList.length; diver++) {
                //kolla vilket format den msåte skickas på, objekt blir lite skumt
                this.socket.emit('compInfo', comp.competitionName, comp.diverList[diver], comp.jumpList[diver][turn]);
                var counter = 0;
                status = comp.competitionName + " " + comp.diverList[diver] + " " + comp.jumpList[diver][turn] + " hoppar nu";
                this.socket.emit('status', status);
                while (counter < comp.numberOfJudges) {
                    //väntar på att dommare ska döma
                    this.socket.on('reciving data', function (data, status) {
                        //tar emot 
                        pointList[counter] = data;
                        counter++;
                        status = "Antal domare som gett poäng: " + counter;
                        this.socket.emit('status', status);
                    });
                }
                //comp innehåller bara namn och score
                var score = this.calculatePoint(comp.difficultyList[diver][turn], pointList);
                this.socket.emit('status', "Total poäng för hoppare: " + score);
                this.socket.emit('store score', score, comp.nameOfCompetition, comp.diverList[diver]);
                counter = 0;
                score = 0;
                console.log("Omgång: ", counter + 1);
            }
            if (turn == comp.numberOfJumps) {
                for (var j = 0; j < comp.diverList.length; j++) {
                    this.socket.emit('store total score', comp.nameOfCompetition, comp.diverList[j]);
                }
            }
        }
        console.log("Tävling avslutad!");
        this.socket.emit('status', "Tävling" + comp.competitionName + "avslutad!");
    };
    AdminHandler.prototype.calculatePoint = function (difficulty, listLength) {
        var min;
        var max;
        var totalPoint;
        if (listLength.length < 5) {
            var resultUnder5;
            for (var i = 0; i < listLength.length; i++) {
                resultUnder5 = resultUnder5 + listLength[i];
            }
            resultUnder5 = resultUnder5 * difficulty;
            totalPoint += resultUnder5;
        }
        else if (listLength.length === 5) {
            var resultEqual5;
            for (var i = 0; i < listLength.length; i++) {
                if (listLength[i] < min) {
                    min = listLength[i];
                }
                if (listLength[i] > max) {
                    max = listLength[i];
                }
            }
            for (var j = 0; j < listLength.length; j++) {
                if (listLength[j] === min || listLength[j] === max) {
                    listLength.splice(j, max);
                }
                else if (listLength[j] === min) {
                    listLength.splice(j, min);
                }
                else {
                    resultEqual5 = resultEqual5 + listLength[j];
                }
            }
            resultEqual5 = resultEqual5 * difficulty;
            totalPoint += resultEqual5;
        }
        else if (listLength.length >= 7) {
            var resultOver7;
            for (var i = 0; i < listLength.length; i++) {
                if (listLength[i] < min) {
                    min = listLength[i];
                }
                if (listLength[i] > max) {
                    max = listLength[i];
                }
            }
            for (var j = 0; j < listLength.length; j++) {
                if (listLength[j] === min || listLength[j] === max) {
                    listLength.splice(j, max);
                }
                else if (listLength[j] === min) {
                    listLength.splice(j, min);
                }
                else {
                    resultOver7 = resultOver7 + listLength[j];
                }
            }
            resultOver7 = resultOver7 * difficulty;
            totalPoint += resultOver7;
        }
        return totalPoint;
    };
    return AdminHandler;
}());
exports.AdminHandler = AdminHandler;
//# sourceMappingURL=AdminHandler.js.map