"use strict";
/**
 * Created by kjlp on 2017-05-08.
 */
var MongoClient = require('mongodb').MongoClient;
var varavariable = 0;
var counterJudges = 0;
class JudgeHandler {
    constructor(socket) {
        this.socket = null;
        this.socket = socket;
        var self = this;
        socket.on('reciving data', function (pointList, diverList, diffList, contestName, numberOfJudges, round) {
            //behöver in pointlist i mongodb, annars kan man inte gå vidare från detta steg
            for (var i = 0; i < numberOfJudges; i++) {
                console.log(diffList[i][round]);
                self.calculatePoint(pointList[i], diffList[i][round], diverList[i], contestName, numberOfJudges);
            }
            counterJudges++;
            if (counterJudges == numberOfJudges) {
                socket.emit('end of contest', numberOfJudges, diverList, contestName);
            }
            console.log(counterJudges);
        });
        socket.on('store score', function (score, competitionName, diverName) {
            console.log("i store score");
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
                            socket.emit('end of contest');
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
        //socket.on('store total score',
        //    function (competitionName, diverName) {
        //        MongoClient.connect('mongodb://95.85.17.152:27017/simhopp',
        //            function (err, db) {
        //                try {
        //                    if (err) {
        //                        throw err;
        //                    }
        //                    var collection = db.collection(competitionName);
        //                    collection.findOne({ 'Name': diverName },
        //                        function (err, document) {
        //                            try {
        //                                if (err) {
        //                                    throw err;
        //                                }
        //                                let totalScore = null;
        //                                for (let i in document.Points) {
        //                                    totalScore += i;
        //                                }
        //                                collection.findAndModify({ 'Name': diverName },
        //                                    { $set: { TotalScore: totalScore } },
        //                                    function (err, result) {
        //                                        try {
        //                                            if (err) {
        //                                                throw err;
        //                                            }
        //                                        } catch (e) {
        //                                            console.log("Data find and modify operation error: " + e);
        //                                        }
        //                                    });
        //                            } catch (e) {
        //                                console.log("Database search error: " + e);
        //                            }
        //                        });
        //                } catch (e) {
        //                    console.log("Database connection error: " + e);
        //                }
        //            });
        //    });
        socket.on('end of contest', function (numberOfJudges, diverList, compname) {
            varavariable++;
            socket.emit('status', "slutpoäng läggs i db");
            console.log("i end of contest!");
            if (varavariable == numberOfJudges) {
                console.log("kollar varavariable");
                self.store_total_score(compname, diverList[0]);
                varavariable = 0;
                socket.emit('status', "tävling slut");
            }
        });
    }
    calculatePoint(point, difficulty, divername, contestName, numberOfJudges) {
        console.log("i calculatePoint!");
        var min;
        var max;
        var totalPoint;
        if (numberOfJudges < 5) {
            var resultUnder5;
            for (var i = 0; i < numberOfJudges; i++) {
                resultUnder5 = resultUnder5 + numberOfJudges[i];
            }
            resultUnder5 = resultUnder5 * difficulty;
            totalPoint += resultUnder5;
        }
        else if (numberOfJudges === 5) {
            var resultEqual5;
            for (var i = 0; i < numberOfJudges; i++) {
                if (numberOfJudges[i] < min) {
                    min = numberOfJudges[i];
                }
                if (numberOfJudges[i] > max) {
                    max = numberOfJudges[i];
                }
            }
            for (var j = 0; j < numberOfJudges; j++) {
                if (numberOfJudges[j] === min || numberOfJudges[j] === max) {
                    numberOfJudges.splice(j, max);
                }
                else if (numberOfJudges[j] === min) {
                    numberOfJudges.splice(j, min);
                }
                else {
                    resultEqual5 = resultEqual5 + numberOfJudges[j];
                }
            }
            resultEqual5 = resultEqual5 * difficulty;
            totalPoint += resultEqual5;
        }
        else if (numberOfJudges >= 7) {
            var resultOver7;
            for (var i = 0; i < numberOfJudges; i++) {
                if (numberOfJudges[i] < min) {
                    min = numberOfJudges[i];
                }
                if (numberOfJudges[i] > max) {
                    max = numberOfJudges[i];
                }
            }
            for (var j = 0; j < numberOfJudges; j++) {
                if (numberOfJudges[j] === min || numberOfJudges[j] === max) {
                    numberOfJudges.splice(j, max);
                }
                else if (numberOfJudges[j] === min) {
                    numberOfJudges.splice(j, min);
                }
                else {
                    resultOver7 = resultOver7 + numberOfJudges[j];
                }
            }
            resultOver7 = resultOver7 * difficulty;
            totalPoint += resultOver7;
        }
        //detta exekveras ej, just nu!
        socket.emit('store score', totalPoint, divername, contestName);
    }
    store_total_score(competitionName, diverName) {
        console.log("i store total score!");
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
                        let totalScore = null;
                        for (let i in document.Points) {
                            totalScore += i;
                        }
                        collection.findAndModify({ 'Name': diverName }, [['_id', 'asc']], { $set: { TotalScore: totalScore } }, function (err, result) {
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
    }
    ;
}
exports.JudgeHandler = JudgeHandler;
//# sourceMappingURL=JudgeHandler.js.map