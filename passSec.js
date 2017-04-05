var crypto = require('crypto');
var bcrypt = require('bcryptjs');

var password = 'Enteredpassword1';

// Asynkron genereringsfunktion som genererar både salt och hashen 
/* crypto.randomBytes(16,function(err, salt) {
    if (err)
        throw err;
    crypto.pbkdf2(password,salt,100000,512,'sha512',function(err,key){
        if (err)
            throw err;
        console.log("Hashed password " + key.toString('hex'));
    });
    
}); */

//Bättre lösning. Denna behöver bcryptjs modulen 
console.log("Password: " + password);
bcrypt.hash(password,10, function(err, hash){
    console.log("Hashed password: " + hash);
});

//För att sedan kontrollera lösenordet så behöver man hasha det man skriver in sedan köra:
var dbHash;
//Funktion för att ladda hashen från databasen och lägga den i dbHash
bcrypt.compare(password, dbHash, function(err,result){
    if (err)
        throw err;
    if (result == true) {
        //tillåt login
     } else {
        //tillåt ej login
     }
})