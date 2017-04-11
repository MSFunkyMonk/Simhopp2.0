
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
            collection.findOne({Username:username}, {Username:1}, function(err, result) {
                if (err)
                    throw err;
                    
                if (result == null) {
                    collection.insert(psswdDoc, {w:1}, function(err, result){});
                    console.log("stored password: " + hash);
                } else if (result.Username == username) {
                    console.log("User already exists");
                } else {
                    collection.insert(psswdDoc, {w:1}, function(err, result){});
                    console.log("stored password: " + hash);
                }

            });     
        });
    });
}

function retrieve(username, pswd) {
        MongoClient.connect("mongodb://95.85.17.152:27017/test", function(err, db) {
            if (err)
                throw err;

            var collection = db.collection('testeroni')
            collection.findOne({Username:username}, {Password: 1}, function(err, item){
                bcrypt.compare(pswd,item.Password, function(err, result) {
                    if (result == true) //Returnerar true/false
                    {
                        console.log("correct password");
                    }
                    else {
                        console.log("incorrect password");
                    }
                });
            });
            
        });
}


register("Anna", password);

//retrieve("Anna", password);

