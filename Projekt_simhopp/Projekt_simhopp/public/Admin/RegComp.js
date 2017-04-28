/// <reference path="./Competition.js" />

(function ($) {

    console.log("i regComp");
    var c = new Competition();
    var counterDiver = 0;
    var counterJump = 0;
    var counterPoints = 0;

    $('#comp').submit(function () {

        c.setNameOfCompetition = $('#compName').val();
        c.setNumberOfContestants = $('#compAmount').val();
        c.setNumberOfJudges = $('#compJudges').val();
        c.setNumberOfJumps = $('#compJumps').val();

        alert("Tävling tillagd!");
    });



    $('#Add').submit(function () {
        console.log("lägger till hoppare");

        if (counterDiver < c.getNumberOfContestants) {
            var v = $('#nameDiver').val();
            console.log(v);
            c.diverList[counterDiver] = new Diver();
            c.diverList[counterDiver].setDiverName = ($('#nameDiver').valueOf());
            c.diverList[counterDiver].setNationality = $('#country').val();
            // c.diverList[counter].jumpList.length = c.getNumberOfJumps;

            console.log("Hoppare: " + counterDiver);

            if (counterDiver === (c.getNumberOfContestants - 1)) {
                console.log("Visa tävlingens deltagare och info!");

                //for (var i in c.diverList) {
                //    $('#compinfo').html(i + " ");
                //}
                counterDiver = 0;
                alert("Kan inte lägga till fler tävlande!");
            }
            counterDiver = counterDiver + 1;

        }


    });
    $('#jump-form').submit(function () {
        console.log("lägger till hopp");


        console.log(counterDiver);
        if (counterDiver < c.getNumberOfContestants) {

            if (counterJump < c.getNumberOfJumps) {
                console.log("Lägger till hopp för: " + c.diverList[counterDiver].getDiverName);
                c.diverList[counterDiver].jumpList[counterJump] = new Jump();
                c.diverList[counterDiver].jumpList[counterJump].setJumpCode = ($('#jCode').valueOf());
                c.diverList[counterDiver].jumpList[counterJump].setDifficulty = ($('#diff').valueOf());
                c.diverList[counterDiver].jumpList[counterJump].setHeight = ($('#height').valueOf());

                counterJump = counterJump + 1;
            }

            if (counterDiver === (c.getNumberOfJumps - 1)) {
                console.log("Alla hoppa är tillagda för: " + c.diverList[counterDiver].getDiverName);
                counterJump = 0;
            }
        }

        if (counterDiver === (c.getNumberOfContestants - 1)) {
            alert("Alla simhoppare har fått sina hopp!");
            counterDiver = 0;
        }


    });

})(jQuery);