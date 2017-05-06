var socket = io();

(function ($) {

    $('#comp').submit(function () {
        console.log("sent contest information to server");
        //socket.emit('contest create', c);

    });


})(jQuery);

