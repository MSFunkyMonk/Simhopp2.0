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
        var x = c.diverList[0].jumpList[0].getDifficulty;
        console.log(x);
        //test för att se om värdet fanns kvar, de gjorde de!
        console.log("sent contest information to server");
        var str = JSON.stringify(c.diverList[0].jumpList[0].difficulty);
        console.log('sent data: ' + str);
        socket.emit('contest create', c);//emit lyckas inte flytta värdet till contest create, comp i socket.on är undefined

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