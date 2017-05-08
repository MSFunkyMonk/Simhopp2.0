"use strict";
var TestServer = (function () {
    function TestServer(socket) {
        var _this = this;
        this.eventTestPageZero = 'ev-test-page-zero';
        this.eventTestPageOne = 'ev-test-page-one';
        this.eventTestPageTwo = 'ev-test-page-two';
        this.socket = null;
        this.onEmitZero = function () {
            var self = _this;
            var json = {
                sectionOne: 'Introduktion',
                contentOne: "Exemplet skall visa p\u00E5 vad som kan g\u00F6ras med node, express och socketio samt att att programmera en applikation best\u00E5ende av en webbsida.",
                sectionTwo: 'Filhantering på servern',
                contentTwo: 'Med modulen fs i node kan datorns filsystem hanteras'
            };
            _this.socket.emit(_this.eventTestPageZero, json);
            _this.socket.on(_this.eventTestPageOne, function (reply) {
                self.onRequestOne();
            });
            _this.socket.on(_this.eventTestPageTwo, function (reply) {
                self.onRequestTwo();
            });
        };
        this.onRequestOne = function () {
            var self = _this;
            var json = {
                dataOne: 'Data 1 for page ONE',
                dataTwo: "Data 2 for page ONE",
            };
            _this.socket.emit(_this.eventTestPageOne, json);
        };
        this.onRequestTwo = function () {
            var json = {
                dataOne: 'Data 1 for page TWO',
                dataTwo: "Data 2 for page TWO",
            };
            _this.socket.emit(_this.eventTestPageTwo, json);
        };
        this.socket = socket;
        this.onEmitZero();
    }
    return TestServer;
}());
exports.TestServer = TestServer;
//# sourceMappingURL=Tserver.js.map