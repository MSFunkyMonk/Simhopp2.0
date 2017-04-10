var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var MongoClient = require('mongodb').MongoClient;

var password = 'Enteredpassword1';

function register(username, pswd) {
    bcrypt.hash(pswd,10, function(err, hash){
        MongoClient.connect('mongodb://95.85.17.152:27017/test', function(err, db) {
            if (err)
                throw err;
            var collection = db.collection('testeroni');
            var psswdDoc = { 'Username' : username , 'Password' : hash }; 

            collection.insert(psswdDoc, {w:1}, function(err, result){});
            console.log("stored password: " + hash)
        });
    });
}

var dbHash;

function retrieve(username, pswd) {
    bcrypt.hash(pswd,10, function(err, hash){
        MongoClient.connect("mongodb://95.85.17.152:27017/test", function(err, db) {
            if (err)
                throw err;
            var collection = db.collection('testeroni')
            collection.findOne({Username:username}, {Password: 1}, function(err, item){
                if (bcrypt.compare(item.Password,hash)) //Returnerar true/false
                {
                    console.log("correct password");
                }
                else {
                    console.log("incorrect password");
                }
                
            });
            
        });
        if (err)
            throw err;
            
        console.log("stored password: " + hash);
    });
}

//register("Kjell", password);

retrieve("Kjell", password);

