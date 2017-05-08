/**
 * Created by kjlp on 2017-05-08.
 */
var JudgeAdministration = (function () {
    function JudgeAdministration(socket) {
        this.socket = null;
        this.socket = socket;
        socket.on('scored', function (data) {
            /* Öppna koppling till databas, lägg in poängen på motsvarande simhoppare på
             korrekt tävling.
             */
        });
    }
    return JudgeAdministration;
}());
//# sourceMappingURL=JudgeAdministration.js.map