/**
 * Created by kevinj on 2017-05-19.
 */
var socket = io();

socket.on('diveInfo', function (compname, diver, jump){
    
    // Visa informationen som skickades med för användaren
    $(document).ready(function() {

        $('#aktiv').html(compname);
        

        $('#contestant').html(diver);
        $('#jumpcode').html(jump);

        $('#anslut').click(function() {
            var point = $('#points').val();
            socket.emit('reciving data', point);
        });
    });

    
});