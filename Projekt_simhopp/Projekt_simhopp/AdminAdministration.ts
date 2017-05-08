var bcrypt = require('bcryptjs');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID();

class ServerContest {
    socket: any = null;

    constructor(socket: any) {
        this.socket = socket;

        socket.on('contest create', function (comp) {
            MongoClient.connect('mongodb://95.85.17.152:27017/test', function (err, db) {
                if (err) {
                    throw err;
                }

                db.createCollection(comp.nameOfCompetition);
                var collection = db.collection(comp.nameOfCompetition);
                for (var i = 0; i < comp.diverList.length; i++) {
                    let diverDoc = {
                        'Name': comp.diverList[i].diverName,
                        'Nationality': comp.diverList[i].nationality,
                        'Jumps': comp.diverList[i].jumpList
                    };

                        collection.insert(diverDoc, function (err, result) {
                        if (err) {
                            throw err;
                        } else {
                            console.log("Diver: " + comp.diverList[i].diverName + " added successfully to: " + comp.nameOfCompetition);
                        }
                        });

                }

                let compDoc = {
                    'CompetitionName': comp.nameOfCompetiton,
                    'NumberOfJumps': comp.numberOfJumps,
                    'NumberOfJudges': comp.numberOfJudges
                };

                collection.insert(compDoc, function (err, result) {
                    if (err) {
                        throw err;
                    } else {
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

                var collection = db.collection(contestName)
                collection.findOne({'CompetitionName': contestName}, function (err, document) {
                    if (err) {
                        throw err;
                    }
                    comp.competitionName = document.CompetitionName;
                    comp.numberOfJumps = document.NumberOfJumps;
                    comp.numberOfJudges = document.NumberOfJudges;
                });
                //Glöm EJ testa!!!!!
                collection.find({'Name': {$exists: true}}, {Name: 1, _id: 0}, function (err, documents) {
                    for (var entry in documents) {
                        comp.diverList.push(entry);
                    }
                });


            });

        });
    }
    public startCompetition(comp: any): void {
        //ej helt klar!
        console.log("Tävling startade!");
        var reciever = [];
        for (var jump = 0; jump < comp.numberOfJumps; jump++) {
            //omgång
            var i = 0;

            for (var diver = 0; diver < comp.numberOfContestants; diver++) {
                //kolla vilket format den msåte skickas på, objekt blir lite skumt
                this.socket.emit('compInfo', { comp });

                while (1) {


                    //väntar på att dommare ska döma
                    while (dömda_poäng !== comp.getNumberOfJudges) {
                        console.log("väntar på domare!");
                        if (dömda_poäng !== 0) {
                            reciever[i].add(dömda_poäng);
                            i += 1;
                        }
                    }
                    if (dömda_poäng === comp.getNumberOfJudges)
                        break;

                }

                //tar emot 
                for (var points of reciever) {
                    var point = points;
                    comp.diverList[diver].jumpList[jump].jumpPoints.pointList.add(point);
                }


                comp.diverList[diver].jumpList[jump].calculatePoint(comp.diverList[diver].jumpList[jump].difficulty);

            }

        }

    }
}