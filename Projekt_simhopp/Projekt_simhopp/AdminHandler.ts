var MongoClient = require('mongodb').MongoClient;

export class AdminHandler {
    socket: any = null;

    constructor(socket: any) {
        this.socket = socket;
        var self = this;
        socket.on('contest create',
            function(comp) {

                MongoClient.connect('mongodb://95.85.17.152:27017/simhopp',
                    function(err, db) {
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

                                collection.insert(diverDoc,
                                    function(err, result) {
                                        try {
                                            if (err) {
                                                throw err;
                                            } else {
                                                console
                                                    .log("Diver: " +
                                                        comp.diverList[i].diverName +
                                                        " added successfully to: " +
                                                        comp.nameOfCompetition);
                                            }
                                        } catch (e) {
                                            console.log("Error inserting diver document number " + i + " : " + e);
                                        }
                                    });

                            }

                            let compDoc = {
                                'CompetitionName': comp.nameOfCompetition,
                                'NumberOfJumps': comp.numberOfJumps,
                                'NumberOfJudges': comp.numberOfJudges
                            };

                            collection.insert(compDoc,
                                function(err, result) {
                                    try {
                                        if (err) {
                                            throw err;
                                        } else {
                                            console.log("Competition created successfully");
                                        }
                                    } catch (e) {
                                        console.log("Error inserting competition document: " + e);
                                    }
                                });
                        } catch (e) {
                            console.log("Database connection error: " + e)
                        }

                    });

            });

        socket.on('start contest',
            function(comp, contestName) {
                console.log("i start contest");
                var diver = 0;
                var turn = 0;
                let Comp = { nameOfCompetition: "", numberOfJumps: 0, numberOfJudges: 0, diverList: [], jumpList: [], difficultyList: [] };
                MongoClient.connect("mongodb://95.85.17.152:27017/simhopp",
                    function(err, db) {

                        try {
                            if (err) {
                                throw err;
                            }

                            var collection = db.collection(contestName);
                            collection.findOne({ 'CompetitionName': contestName },
                                function(err, document) {
                                    try {
                                        if (err) {
                                            throw err;
                                        }
                                        console.log(document.CompetitionName);

                                        Comp.nameOfCompetition = document.CompetitionName;
                                        Comp.numberOfJumps = document.NumberOfJumps;
                                        Comp.numberOfJudges = document.NumberOfJudges;
                                        console.log(Comp.nameOfCompetition);
                                     
                                    } catch (e) {
                                        console.log("Database search error: " + e);
                                    }
                                });
                            collection.find({ 'Name': { $exists: true } }, { _id: 0 }).each(function (err, document) {
                                try {
                                    if (err) {
                                        throw err;
                                    }
                                    if (document !== null && document.Name !== null) {


                                        console.log(`Collection found: ${document.Name} ${document.Jumps} ${document
                                            .Difficulty}`);

                                        Comp.diverList.push(document.Name);
                                        console.log(Comp.diverList[0]);
                                        Comp.jumpList.push(document.Jumps);
                                        console.log(Comp.jumpList[0][0].jumpCode);
                                        Comp.difficultyList.push(document.Difficulty);
                                        self.compStart(Comp, turn, diver);
                                    }
                                } catch (e) {
                                    console.log("Error finding diver documents" + e);
                                }
                                
                            });
                            //socket.emit('active competition');

                        } catch (e) {
                            console.log("Database connection error: " + e);
                        }
                    });


            });

        socket.on('reciving data',
            function(point, comp, turn, diver) {
                //tar emot 
                var self = this;
                
                //behöver in pointlist i mongodb, annars kan man inte gå vidare från detta steg



    
                if (list.size == comp.numberOfJudges) {
                    var points = self.calculatePoint(comp.difficultyList[diver][turn], pointList);
                    this.socket.emit('store score', points, comp.nameOfCompetition, comp.diverList[diver]);
                }
        });
        socket.on('store score',
            function(score, competitionName, diverName) {
                MongoClient.connect('mongodb://95.85.17.152:27017/simhopp',
                    function(err, db) {
                        try {
                            if (err) {
                                throw err;
                            }

                            var collection = db.collection(competitionName);
                            collection.findAndModify({ 'Name': diverName },
                                { $push: { Points: score } },
                                function(err, result) {
                                    try {
                                        if (err) {
                                            throw err;
                                        }
                                    } catch (e) {
                                        console.log("Error with find and update operation: " + e);
                                    }
                                })
                        } catch (e) {
                            console.log("Database connection error: " + e);
                        }
                    });
            });

        socket.on('store total score',
            function(competitionName, diverName) {
                MongoClient.connect('mongodb://95.85.17.152:27017/simhopp',
                    function(err, db) {
                        try {
                            if (err) {
                                throw err;
                            }
                            var collection = db.collection(competitionName);
                            collection.findOne({ 'Name': diverName },
                                function(err, document) {
                                    try {
                                        if (err) {
                                            throw err;
                                        }

                                        let totalScore = null;
                                        for (let i in document.Points) {
                                            totalScore += i;
                                        }
                                        collection.findAndModify({ 'Name': diverName },
                                            { $set: { TotalScore: totalScore } },
                                            function(err, result) {
                                                try {
                                                    if (err) {
                                                        throw err;
                                                    }
                                                } catch (e) {
                                                    console.log("Data find and modify operation error: " + e);
                                                }
                                            });
                                    } catch (e) {
                                        console.log("Database search error: " + e);
                                    }
                                });
                        } catch (e) {
                            console.log("Database connection error: " + e);
                        }
                    });
            });

        socket.on('active competition',
            function(contestName) {
                MongoClient.connect('mongodb://95.85.17.152:27017/simhopp',
                    function(err, db) {
                        try {
                            if (err) {
                                throw err;
                            }
                            var collection = db.collection('activeContest');
                            collection.findAndModify({ 'Name': { $exists: true } },
                                { $set: { Name: contestName } },
                                function(err, document) {
                                    try {
                                        if (err) {
                                            throw err;
                                        }

                                    } catch (e) {
                                        console.log("Database search error: " + e);
                                    }
                                });
                        } catch (e) {
                            console.log("Database connection error: " + e);
                        }
                    });
            });

    }
    public compStart(comp: any, turn: number, diver: number): void {

        if (diver < comp.diverList.length && turn < comp.numberOfJumps) {
            this.socket.emit('comp info',comp, turn, diver);
        }
        else {
                
        }

    }



    public calculatePoint(difficulty: any, listLength: any): number {
        var min;
        var max;
        var totalPoint;
        if (listLength.length < 5) {
            var resultUnder5: number;
            for (var i = 0; i < listLength.length; i++) {
                resultUnder5 = resultUnder5 + listLength[i];
            }

            resultUnder5 = resultUnder5 * difficulty;
            totalPoint += resultUnder5;
        } else if (listLength.length === 5) {
            var resultEqual5: number;
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

                } else if (listLength[j] === min) {
                    listLength.splice(j, min);
                } else {
                    resultEqual5 = resultEqual5 + listLength[j];
                }

            }
            resultEqual5 = resultEqual5 * difficulty;
            totalPoint += resultEqual5;


        } else if (listLength.length >= 7) {

            var resultOver7: number;
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

                } else if (listLength[j] === min) {
                    listLength.splice(j, min);
                } else {
                    resultOver7 = resultOver7 + listLength[j];
                }

            }
            resultOver7 = resultOver7 * difficulty;
            totalPoint += resultOver7;

        }
        return totalPoint;
    }
}