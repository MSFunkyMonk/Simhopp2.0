/// <reference path="./Competition.js" />
var c = new Competition();
$(document).ready(function() {

    console.log("i regComp");
    //var c = new Competition();
    var counterDiver = 0;
    var counterJump = 0;
    var counterPoints = 0;

    $('#funka').click(function() {

        //förändra klasserna och ta bort get-set funktionerna?
        c.nameOfCompetition = $('#compName').val();
        c.numberOfContestants = $('#compAmount').val();
        c.numberOfJudges = $('#compJudges').val();
        c.numberOfJumps = $('#compJumps').val();
        $("#skapaH").show();
        alert("Tävling tillagd!");
        $('#update').append("Tävling tillagd!</br>");


    });


    $('#addDiver').click(function() {
        console.log("lägger till hoppare");

        if (counterDiver < c.numberOfContestants) {
            var v = $('#nameDiver').val();
            console.log(v);
            c.diverList[counterDiver] = new Diver();
            c.diverList[counterDiver].diverName = $('#nameDiver').val();
            c.diverList[counterDiver].nationality = $('#country').val();

            console.log("Hoppare: " + counterDiver);
            var name = c.diverList[counterDiver].diverName;
            console.log(name);
            $('#update').append(name + " är registrerad! </br>");


            if (counterDiver === (c.numberOfContestants - 1)) {

                counterDiver = 0;
                $("#skapaJ").show();
                alert("Lagt till alla tävlande!");
                $('#update').append("Lagt till alla tävlande! </br>");

            } else {
                counterDiver = counterDiver + 1;
            }
        }
    });
    $('#addJump').click(function() {
        console.log("lägger till hopp");


        console.log(counterDiver);
        console.log(counterJump);

        if (counterDiver < c.numberOfContestants) {


            if (counterJump < c.numberOfJumps) {

                c.diverList[counterDiver].jumpList[counterJump] = new Jump();
                c.diverList[counterDiver].jumpList[counterJump].jumpCode = $('#jCode').val();
                c.diverList[counterDiver].jumpList[counterJump].difficulty = $('#diff').val();
                c.diverList[counterDiver].jumpList[counterJump].height = $('#height').val();
                var name = c.diverList[counterDiver].jumpList[counterJump].jumpCode;
                var diff = c.diverList[counterDiver].jumpList[counterJump].difficulty;
                var height = c.diverList[counterDiver].jumpList[counterJump].height;
                console.log(name);
                console.log(diff);
                console.log(height);
                console.log(counterJump);
                $('#update').append("Lagt till hopp nummer" +
                    counterDiver +
                    1 +
                    "för" +
                    c.diverList[counterDiver].diverName +
                    "</br>");

            }

            if (counterJump === (c.numberOfJumps - 1)) {
                console.log("Alla hoppa är tillagda för: " + c.diverList[counterDiver].diverName);
                $('#update').append("Alla hoppa är tillagda för: " + c.diverList[counterDiver].diverName + "</br>");
                counterJump = 0;
                counterDiver++;
            } else {
                counterJump = counterJump + 1;
            }

        }
        console.log(counterDiver);
        console.log(c.numberOfContestants);
        if (counterDiver === c.numberOfContestants) {
            //vill aldrig gå in i den här funktionen trots de lika värdena?
            alert("Alla simhoppare har fått sina hopp!");
            $('#update').append("Alla hoppa är tillagda! </br >");
            counterDiver = 0;
        }


    });

});