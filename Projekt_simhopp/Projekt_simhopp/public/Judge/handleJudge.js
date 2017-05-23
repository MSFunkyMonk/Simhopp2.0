/**
 * Created by kevinj on 2017-05-19.
 */
var socket = io('/Judge');

console.log("i handleJudge");

socket.on('diveInfo', function (compname, diver, jump){
    console.log("i diverinfo")
    $(document).ready(function () {
                console.log("skriver i paragrafer!")
            // Visa informationen som skickades med för användaren
                $('#aktiv').html(compname);
                $('#contestant').html(diver);
                $('#jumpcode').html(jump);

                console.log(compname);
                console.log(diver);
                console.log(jump);

                $('#skicka').click(function() {
                    var point = $('#points').val();
            
                    if (point >= 0) {
                        socket.emit('reciving data', point, status);
                    } else {
                        alert("Score can't be below zero!");
                    }

                });
           });

    
});