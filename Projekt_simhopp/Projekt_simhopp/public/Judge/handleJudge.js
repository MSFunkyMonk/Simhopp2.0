/**
 * Created by kevinj on 2017-05-19.
 */
var socket = io('/Judge');

console.log("i handleJudge");

socket.on('diveInfo', function (comp, turn, diver){
    console.log("i diverinfo")
    $(document).ready(function () {
                console.log("skriver i paragrafer!")
            // Visa informationen som skickades med för användaren
                $('#aktiv').html(comp.nameOfCompetition);
                $('#contestant').html(comp.diverList[diver]);
                $('#jumpcode').html(comp.jumpList[diver][turn].jumpCode);

                console.log(comp.nameOfCompetition);
                console.log(comp.diverList[diver]);
                console.log(comp.jumpList[diver][turn].jumpCode);

                $('#skicka').click(function() {
                    var point = $('#points').val();
            
                    if (point >= 0) {
                        socket.emit('reciving data', point, comp, turn, diver);
                    } else {
                        alert("Score can't be below zero!");
                    }

                });
           });

    
});