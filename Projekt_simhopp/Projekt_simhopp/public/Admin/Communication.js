var socket = io();

(function ($) {
    $('#startComp').click(function () {
        console.log("sent contest information to server:");
        var str = JSON.stringify(c);
        console.log('sent data: ' + str);
        socket.emit('contest create', c);

    });

})(jQuery);

