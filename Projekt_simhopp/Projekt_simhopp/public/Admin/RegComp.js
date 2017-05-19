/// <reference path="./Competition.js" />
var c = new Competition();
(function ($) {

    console.log("i regComp");
    //var c = new Competition();
    var counterDiver = 0;
    var counterJump = 0;
    var counterPoints = 0;

    $('#comp').submit(function () {

       //förändra klasserna och ta bort get-set funktionerna?
        c.nameOfCompetition = $('#compName').val();
        c.numberOfContestants = $('#compAmount').val();
        c.numberOfJudges = $('#compJudges').val();
        c.numberOfJumps = $('#compJumps').val();
        $("#skapaH").show();
        alert("Tävling tillagd!");

    });



    $('#Add').submit(function () {
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
            
            if (counterDiver === (c.numberOfContestants - 1)) {

                counterDiver = 0;
                $("#skapaJ").show();
                alert("Lagt till alla tävlande!");
            } else {
                counterDiver = counterDiver + 1;  
            }

        }
    });
    $('#jump-form').submit(function () {
        console.log("lägger till hopp");


        console.log(counterDiver);
        console.log(counterJump);
        if (counterDiver < c.numberOfContestants) {

            
            if (counterJump < c.numberOfJumps) {

                c.diverList[counterDiver].jumpList[counterJump] = new Jump();
                c.diverList[counterDiver].jumpList[counterJump].jumpCode = $('#jCode').val();
                c.diverList[counterDiver].jumpList[counterJump].difficulty = $('#diff').val();
                c.diverList[counterDiver].jumpList[counterJump].height= $('#height').val();
                var name = c.diverList[counterDiver].jumpList[counterJump].jumpCode;
                var diff = c.diverList[counterDiver].jumpList[counterJump].difficulty;
                var height = c.diverList[counterDiver].jumpList[counterJump].height;
                console.log(name);
                console.log(diff);
                console.log(height);
                console.log(counterJump);
            }

            if (counterJump === (c.numberOfJumps - 1)) {
                console.log("Alla hoppa är tillagda för: " + c.diverList[counterDiver].diverName);
                counterJump = 0;
                counterDiver++;
            } else {
                counterJump = counterJump + 1;     
            }
        }

        /*if (counterDiver === c.getNumberOfContestants) {
            alert("Alla simhoppare har fått sina hopp!");
            counterDiver = 0;
        } */


    });

})(jQuery);