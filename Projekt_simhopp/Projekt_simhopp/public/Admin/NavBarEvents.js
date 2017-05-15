var socket = io();
(function ($) {

    //visar forms för att skapa tävling
    $('#createComp').click(function () {
        console.log("click button");
        $("#skapaT").show();
    });

    $('#startComp').click(function () {
        console.log("sent contest information to server:");
        var str = JSON.stringify(c);
        console.log('sent data: ' + str);
        socket.emit('contest create', c);

    });

})(jQuery);