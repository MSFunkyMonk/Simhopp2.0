var socket = io('/Admin');
(function ($) {

    //visar forms för att skapa tävling
    $('#createComp').click(function () {
        console.log("click button");
        $("#skapaT").show();
    });

    $('#startComp').click(function () {
        console.log("sent contest information to server:");
        socket.emit('contest create', c);
        $('#update').append("Lägger till i databas!</br >");
    });
    $('#extraknapp').click(function () {
        console.log("sent contest information to server:");
        socket.emit('start contest', c.nameOfCompetition);
        
        $('#update').append("Startar tävling!</br >");
    });
})(jQuery);