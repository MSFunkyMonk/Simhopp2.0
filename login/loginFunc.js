var bcrypt = require('bcryptjs');
var MongoClient = require('mongodb').MongoClient;
var $ = require('jquery');

//Se login.html för varför detta inte fungerar

function login(username, pswd) {
        MongoClient.connect("mongodb://95.85.17.152:27017/test", function(err, db) {
            if (err)
                throw err;

            var collection = db.collection('testeroni')
            collection.findOne({Username:username}, {Password: 1}, function(err, item){
                bcrypt.compare(pswd,item.Password, function(err, result) {
                    if (result == true) //Returnerar true/false
                    {
                        $data = 1;
                        console.log("Correct password");
                    }
                    else {
                        $data = 0;
                        console.log("Incorrect pasword");
                    }
                });
            });
            
        });
}

$email=$_POST['email1'];
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$password = $_POST['password1'];

login($email, $password);

