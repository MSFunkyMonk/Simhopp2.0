"use strict";
var MongoClient = require('mongodb').MongoClient;
var AdminHandler = (function () {
    function AdminHandler(socket) {
        this.socket = null;
        this.socket = socket;
        socket.on('contest create', function (comp) {
            console.log('data recieved ' + JSON.stringify(comp));
            MongoClient.connect('mongodb://95.85.17.152:27017/simhopp', function (err, db) {
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
                    'CompetitionName': comp.nameOfCompetition,
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
        socket.on('start contest', function (contestName) {
            var comp = null;
            MongoClient.connect("mongodb://95.85.17.152:27017/simhopp", function (err, db) {
                if (err)
                    throw err;
                var collection = db.collection(contestName);
                collection.findOne({ 'CompetitionName': contestName }, function (err, document) {
                    if (err) {
                        throw err;
                    }
                    comp.competitionName = document.CompetitionName;
                    comp.numberOfJumps = document.NumberOfJumps;
                    comp.numberOfJudges = document.NumberOfJudges;
                });
                //Glöm EJ testa!!!!!
                collection.find({ 'Name': { $exists: true } }, { _id: 0 }).each(function (err, document) {
                    console.log("Collection found: " + document.Name + " " + document.Jumps + " " + document.Difficulty);
                    comp.diverList.push(document.Name);
                    comp.jumpList.push(document.Jumps);
                    comp.difficultyList.push(document.Difficulty);
                });
            });
            socket.emit('contest data retrieved', comp);
        });
    }
    AdminHandler.prototype.startCompetition = function () {
        //ej helt klar!
        var comp = null;
        while (comp == null) {
            this.socket.on('contest data retrieved', function (data) {
                comp = data;
            });
        }
        console.log("Tävling startade!");
        var pointList;
        for (var turn = 0; turn < comp.numberOfJumps; turn++) {
            //omgång
            var i = 0;
            for (var diver = 0; diver < comp.diverList.length; diver++) {
                //kolla vilket format den msåte skickas på, objekt blir lite skumt
                this.socket.emit('compInfo', { comp: comp });
                var counter = 0;
                while (counter < comp.numberOfJudges) {
                    //väntar på att dommare ska döma
                    this.socket.on('reciving data', function (data) {
                        //tar emot 
                        pointList[counter] = data.score;
                        counter++;
                    });
                }
                //comp innehåller bara namn och score, måste ändras då 
                comp.diverList[diver];
                comp.jumpList[diver][turn];
                counter = 0;
            }
            console.log("Omgång: ", counter + 1);
        }
    };
    return AdminHandler;
}());
exports.AdminHandler = AdminHandler;
//# sourceMappingURL=AdminHandler.js.map