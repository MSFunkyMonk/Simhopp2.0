"use strict";
var MongoClient = require('mongodb').MongoClient;
class AdminHandler {
    constructor(socket) {
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
                    for (let i = 0; i < comp.diverList.length; i++) {
                        let difficultList = [comp.diverList[i].jumpList[0].difficulty];
                        for (let j = 1; j < comp.diverList[i].jumpList.length; j++) {
                            difficultList.push(comp.diverList[i].jumpList[j].difficulty);
                        }
                        let diverDoc = {
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
                    }
                    let compDoc = {
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
        socket.on('start contest', function (contestName) {
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
                            console.log(`Collection found: ${document.Name} ${document.Jumps} ${document.Difficulty}`);
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
            socket.emit('contest data retrieved', comp);
        });
        socket.on('', function (comp) {
        });
    }
    startCompetition() {
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
                comp.diverList[diver].jumpList[diver][turn].difficultyList[diver][turn];
                comp.jumpList[diver][turn];
                this.calculatePoint(comp.difficultyList[diver][turn]);
                counter = 0;
            }
            console.log("Omgång: ", counter + 1);
        }
    }
    calculatePoint(difficulty, listLength) {
        var min;
        var max;
        if (listLength.length < 5) {
            var resultUnder5;
            for (var i = 0; i < listLength.length; i++) {
                resultUnder5 = resultUnder5 + listLength[i];
            }
            resultUnder5 = resultUnder5 * difficulty;
            this.point += resultUnder5;
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
            this.point += resultEqual5;
        }
        else if (listLength.length >= 7) {
            var resultOver7;
            for (var i = 0; i < listLength.length; i++) {
                if (listLength[i] < min) {
                    min = listLength[i];
                }
                if (this.listLength[i] > max) {
                    max = this.listLength[i];
                }
            }
            for (var j = 0; j < this.listLength.length; j++) {
                if (this.listLength[j] === min || this.listLength[j] === max) {
                    this.listLength.splice(j, max);
                }
                else if (this.listLength[j] === min) {
                    this.listLength.splice(j, min);
                }
                else {
                    resultOver7 = resultOver7 + this.listLength[j];
                }
            }
            resultOver7 = resultOver7 * difficulty;
            this.point += resultOver7;
        }
    }
}
exports.AdminHandler = AdminHandler;
//# sourceMappingURL=AdminHandler.js.map