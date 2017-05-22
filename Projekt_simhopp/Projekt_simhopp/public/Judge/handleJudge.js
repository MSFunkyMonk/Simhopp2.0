/**
 * Created by kevinj on 2017-05-19.
 */
var socket = io('/Judge');

socket.on('diveInfo', function (compname, diver, jump){
    
    // Visa informationen som skickades med för användaren
    $(document).ready(function() {

        $('#aktiv').html(compname);
        

        $('#contestant').html(diver);
        $('#jumpcode').html(jump);

        $('#anslut').click(function () {
            
            var point = $('#points').val();
            if (point >= 0) {
                socket.emit('reciving data', point);
            } else {
                alert("Score can't be below zero!");
            }
        });
    });

    
});