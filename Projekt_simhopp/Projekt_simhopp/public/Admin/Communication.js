var socket = io();

(function ($) {

    $('#comp').submit(function () {
        console.log("sent contest information to server");
        /*socket.on('successful login', function(c) {
            if(c === 'Judge') {
                socket = io('/judge');
            }
         ); */

    });

})(jQuery);

socket.on('redirect', function(destination){
    window.location.href = destination;
});