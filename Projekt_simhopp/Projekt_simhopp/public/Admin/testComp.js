(function ($) {

    console.log("framme");
    $('#comp').submit(function () {

        alert("Tävling tillagd");
        var c = new Competition();
        c.setNameOfCompetition = $('#compName').val();
        c.setNUmberOfContestants = $('#compAmount').val();
        c.setNumberOfJudges = $('#compJudges').val();
        c.setNumberOfJumps = $('#compJumps').val();

        var n = c.getNameOfCompetition;
        var con = c.getNUmberOfContestants;
        var jud = c.getNumberOfJudges;
        var jum = c.getNumberOfJumps;

        $('#compinfo').html('tävlingnamn:' + n + 'antal:' + con + 'antal domare:' + jud + 'antal hopp:' + jum);

    });

})(jQuery);