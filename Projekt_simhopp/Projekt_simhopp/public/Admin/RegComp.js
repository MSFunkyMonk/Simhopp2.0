/// <reference path="./Competition.js" />
var c = new Competition();
(function ($) {

    console.log("i regComp");
    //var c = new Competition();
    var counterDiver = 0;
    var counterJump = 0;
    var counterPoints = 0;

    $('#comp').submit(function () {

       
        c.setNameOfCompetition = $('#compName').val();
        c.setNumberOfContestants = $('#compAmount').val();
        c.setNumberOfJudges = $('#compJudges').val();
        c.setNumberOfJumps = $('#compJumps').val();
        $("#skapaH").show();
        alert("Tävling tillagd!");

    });



    $('#Add').submit(function () {
        console.log("lägger till hoppare");

        if (counterDiver < c.getNumberOfContestants) {
            var v = $('#nameDiver').val();
            console.log(v);
            c.diverList[counterDiver] = new Diver();
            c.diverList[counterDiver].setDiverName = $('#nameDiver').val();
            c.diverList[counterDiver].setNationality = $('#country').val();

            console.log("Hoppare: " + counterDiver);
            var name = c.diverList[counterDiver].getDiverName;
            console.log(name);

            if (counterDiver === (c.getNumberOfContestants - 1)) {

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
        if (counterDiver < c.getNumberOfContestants) {
            //var name0 = c.diverList[0].getDiverName;
            //var name1 = c.diverList[1].getDiverName;
            //var name2 = c.diverList[2].getDiverName;

            //console.log(name0);
            //console.log(name1);
            //console.log(name2);

            if (counterJump < c.getNumberOfJumps) {
                var name = c.diverList[counterDiver].getDiverName;
                console.log("Lägger till hopp för: " + name);
                c.diverList[counterDiver].jumpList[counterJump] = new Jump();
                c.diverList[counterDiver].jumpList[counterJump].setJumpCode = ($('#jCode').valueOf());
                c.diverList[counterDiver].jumpList[counterJump].setDifficulty = ($('#diff').valueOf());
                c.diverList[counterDiver].jumpList[counterJump].setHeight = ($('#height').valueOf());

            }

            if (counterJump === (c.getNumberOfJumps - 1)) {
                console.log("Alla hoppa är tillagda för: " + c.diverList[counterDiver].getDiverName);
                counterJump = 0;
                counterDiver++
            } else {
                counterJump = counterJump + 1;     
            }
        }

        if (counterDiver === c.getNumberOfContestants) {
            alert("Alla simhoppare har fått sina hopp!");
            counterDiver = 0;
        }


    });

})(jQuery);