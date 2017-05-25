/**
 * Created by kevinj on 2017-05-19.
 */
var socket = io('/Judge');

var c = null;
var pointList = [];
console.log("i handleJudge");

socket.on('diveInfo', function (comp){
    if (comp != null) {
        console.log("i diverinfo");
        c = comp;
        $('#aktiv').html(comp.nameOfCompetition);
        $('#contestant').html(comp.diverList[0]);
        $('#jumpcode').html(comp.jumpList[0][0].jumpCode);


        console.log(comp.nameOfCompetition);
        console.log(comp.diverList[0]);
        console.log(comp.jumpList[0][0].jumpCode);
    }
});

$(document).ready(function () {
    console.log("skriver i paragrafer!");
    // Visa informationen som skickades med för användaren
    var i = 0;
    var y = 0; //omgång
    $('#next').click(function() {

        var point = $('#points').val();
        pointList.push(point);
        console.log(JSON.stringify(c.difficultyList));
        if (point >= 0) {

            if (i + 1 == c.diverList.length) {
                console.log(" ska skicka omgång");
                socket.emit('status', "Omgång " + y + " färdig!");
                socket.emit('reciving data', pointList, c.diverList, c.difficultyList, c.nameOfCompetition,c.numberOfJudges, y);
                y++;
                i = 0
            }
            else {
                i++;
                $('#aktiv').html(c.nameOfCompetition);
                $('#contestant').html(c.diverList[i]);

                console.log(i);
                console.log(y);
                console.log(c.diverList[i]);
                console.log(c.jumpList[i][y].jumpCode);
                console.log(JSON.stringify(c.jumpList[i][y].jumpCode));
                console.log(JSON.stringify(c.jumpList));
                $('#jumpcode').html(c.jumpList[i][y].jumpCode);
                console.log(JSON.stringify(c.difficultyList[i][y]));
            }
            //if (c.numberOfJudges == 1 && c.numberOfJumps == 1){
            //    //för den första omgången
            //    console.log(" tävling slut!");
            //    socket.emit('status', "tävlingen är slut!");
            //    socket.emit('store score', c.numberOfJumps, c.diverList, c.nameOfCompetition);
            //} else {

            //}

            
        } else {
            alert("Score can't be below zero!");
        }

    });

});

