﻿var socket = io();

(function ($) {
    //skapa konton
    console.log("konto spec");
    $('#adminCreate').submit(function () {

        var username = $('#userNameAdmin').val();
        var password = $('#passwordAdmin').val();
        var name = $('#nameAdmin').val();
        var email = $('#emailAdmin').val();

        socket.emit('register', username, password, name, email, "Admin");
        console.log("skapat admin");

    });
    $('#judgeCreate').submit(function () {

        var username = $('#userNameJudge').val();
        var password = $('#passwordJudge').val();
        var name = $('#nameJudge').val();
        var email = $('#emailJudge').val();

        socket.emit('register', username, password, name, email, "Judge");
        console.log("skapat judge");
    });

    $('#loginAdmin').submit(function () {

        var username = $('#loginUserNameAdmin').val();
        var password = $('#loginPasswordAdmin').val();

        socket.emit('login', username, password);
        console.log("login admin");
    });
    $('#loginJudge').submit(function () {

        var username = $('#loginUserNameJudge').val();
        var password = $('#loginPasswordJudge').val();

        
        socket.emit('login', username, password);
        console.log("login judge");
    });
});

socket.on('redirect', function (destination) {
    window.location.href = destination;
});