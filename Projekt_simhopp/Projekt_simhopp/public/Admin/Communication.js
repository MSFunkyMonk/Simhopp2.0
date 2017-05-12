var socket = io();

(function ($) {

    $('#comp').submit(function () {
        //socket.emit('create contest');
        //console.log("sent contest information to server");
        /*socket.on('successful login', function(c) {
            if(c === 'Judge') {
                socket = io('/judge');
            }
         ); */

    });

    $('#startComp').click(function () {
        //socket.emit('create contest');
        console.log("sent contest information to server");
        console.log('sent data: ' + c.diverList[1].jumpList[0].difficulty);
        socket.emit('contest create', c);
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