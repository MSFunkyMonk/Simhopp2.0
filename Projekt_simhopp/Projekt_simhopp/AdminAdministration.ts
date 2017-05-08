var bcrypt = require('bcryptjs');
var MongoClient = require('mongodb').MongoClient;

class ServerContest {
    socket: any = null;
    constructor(socket: any) {
        this.socket = socket;

        socket.on('contest create', function(comp) {
            MongoClient.connect('mongodb://95.85.17.152:27017/test', function (err, db) {
                if (err) {
                    throw err;
                }

                db.createCollection(comp.nameOfCompetition);

                var compDoc = {
                    'Divers': comp.diverList,
                    'Numper of Jumps': comp.numberOfJumps,
                    'Number of Judges': comp.numberOfJudges
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
                for (var i = 0; i < comp.diverList.length; i++) {
                    var diverDoc = {'Name': comp.diverList[i].diverName, 'Nationality': comp.diverList[i].nationality, 'Jumps': comp.diverList[i].jumpList}

                    collection.insert(diverDoc, function (err, result) {
                        if (err) {
                            throw err;
                        } else {
                            console.log("Diver: " + comp.diverList[i].diverName + " added successfully to: " + comp.nameOfCompetition);
                        }
                    });
                }

            });
        });

        socket.on('start contest', function(contestName) {
            /* accessa databasen, hämta information om korrekt tävling
             skicka event till judge namespace med objektet som innehåller informationen
             */
        });
    }
}