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
                for (var i = 0; i < comp.diverList.length; i++) {
                    var diverDoc = {
                        'Name': comp.diverList[i].diverName,
                        'Nationality': comp.diverList[i].nationality,
                        'Jumps': comp.diverList[i].jumpList
                    }

                    collection.insert(diverDoc, function (err, result) {
                        if (err) {
                            throw err;
                        } else {
                            console.log("Diver: " + comp.diverList[i].diverName + " added successfully to: " + comp.nameOfCompetition);
                        }
                    });
                }

                var compDoc = {
                    'CompetitionName': comp.nameOfCompetiton,
                    'NumberOfJumps': comp.numberOfJumps,
                    'NumberOfJudges': comp.numberOfJudges
                };

                var collection = db.collection(comp.nameOfCompetition);
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

<<<<<<< HEAD
        socket.on('start contest', function (contestName) {
            var comp = null;
            MongoClient.connect("mongodb://95.85.17.152:27017/simhopp", function (err, db) {
                if (err)
                    throw err;

                var collection = db.collection(contestName)
                collection.findOne({'CompetitionName': contestName}, function(err, document){
                    if (err) { throw err; }
                    comp.competitionName = document.CompetitionName;
                    comp.numberOfJumps = document.NumberOfJumps;
                    comp.numberOfJudges = document.NumberOfJudges;
                });
                //Glöm EJ testa!!!!!
                collection.find({'Name' : {$exists: true}}, {Name: 1, _id: 0}, function(err, documents){
                    for (var entry in documents) {
                        comp.diverList.push(entry);
                    }
                });



            });
=======
        socket.on('start contest', function(contestName) {
            /* accessa databasen, hämta information om korrekt tävling
             skicka event till judge namespace med objektet som innehåller informationen
             */
             
>>>>>>> 2cda0d9eacbaa5eaac34cb01873b40110518d168
        });
    }
}