/**
 * Created by kjlp on 2017-05-08.
 */

class JudgeAdministration {
    socket: any = null;

    constructor(socket: any) {
        this.socket = socket;

        socket.on('scored', function(data){
            /* Öppna koppling till databas, lägg in poängen på motsvarande simhoppare på
             korrekt tävling.
             */
        });
    }
}
