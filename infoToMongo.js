var MongoClient = require("mongodb").MongoClient;


function savePoints(info)
{
    MongoClient.connect('mongodb://95.85.17.152:27017/test', function(err, db) {
        if (err) {throw err;}

        var collection = db.collection('testeroni'); //Detta skall egentiligen ändras till vad tävlingen heter

        /* Skapar ett document som tar info från parametrarna. 
        ** I nuvarande konstruktion så antar jag att vi har ett objekt som uppdateras efter varje hopp,
        ** och att databasen uppdateras efter denna hoppares objekt är färdiguppdaterad (hoppat sitt sista hopp)
        ** Värt att påpeka: Contest name skall egentiligen bort då den finns bara där för testsyften */
        var pointsDoc = { 'Contestant' : info.name,'Contest name' : info.contestName, 'Points' : info.points}; 
        
        /* Letar om det redan finns en hoppare med detta namn, om inte skapa ny annars uppdatera befintlig. 
        ** Uppdateringsfunktionen har optionen "Upsert" vilket innebär att den uppdaterar om den redan finns
        ** annars så skapar den ett nytt document och sätter in informationen som jag har givit den */
        collection.update({Contestant:info.name}, pointsDoc, {upsert:true}, function(err, result){
            if (err) { throw err; }

            console.log("Database updated successfully");
                
            });
        });
}

var pointeroni = {name:"Kjell", contestName:"Tjolahoppsan", points:23.5}
savePoints(pointeroni);