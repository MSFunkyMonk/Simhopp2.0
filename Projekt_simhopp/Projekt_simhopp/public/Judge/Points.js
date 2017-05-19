var socket;

function setup() {
    socket = socket.io.connect('http://localhost:3000')
    console.log("SOCKET ON BLYAT");
}

(function ($) {
    console.log("test1");
    $('#test').click(function () {
        alert($('select[name=selector]').val());
        console.log($('select[name=selector]').val());
    });
})(jQuery);

