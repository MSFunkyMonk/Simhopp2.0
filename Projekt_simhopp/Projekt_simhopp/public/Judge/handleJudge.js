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
        $('#jumpcode').html(comp.jumpList[0].jumpCode);

        console.log(comp.nameOfCompetition);
        console.log(comp.diverList[0]);
        console.log(comp.jumpList[0].jumpCode);
    }
});

$(document).ready(function () {
    console.log("skriver i paragrafer!");
    // Visa informationen som skickades med för användaren

    $('#next').click(function() {

        var point = $('#points').val();
        pointList.push(point);
        var i = 0;
        var y = 0; //omgång

        if (point >= 0) {

            console.log(JSON.stringify(c.jumpList));
            
            if (i == c.diverList.length) {
                socket.emit('status', "Omgång " + y + " färdig!");
                socket.emit('reciving data',
                    pointList,
                    c.diverList,
                    c.difficultyList,
                    c.nameOfCompetition,
                    c.numberOfJudges,
                    y);
                y++;
                i = 0
            }
            if (y == c.jumpList[0].length) {
                socket.emit('stats', "tävlingen är slut!");
                socket.emit('end of contest', c.nameOfCompetition, c.diverList);
            }
            i++;
            $('#aktiv').html(c.nameOfCompetition);
            $('#contestant').html(c.diverList[i]);
            console.log(JSON.stringify(c.jumpList[i].jumpCode))
            $('#jumpcode').html(c.jumpList[i].jumpCode);
        } else {
            alert("Score can't be below zero!");
        }

    });

});

