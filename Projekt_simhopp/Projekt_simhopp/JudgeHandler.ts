/**
 * Created by kjlp on 2017-05-08.
 */

class JudgeAdministration {
    socket: any = null;

    constructor(socket: any) {
        this.socket = socket;

        socket.on('scored', function(data){
            /* Öppna koppling till databas, lägg in poängen på motsvarande simhoppare på
             korrekt tävling. Lägg till fält för hoppen och ett fält för totala poängen.
             $set för nya fält samt ändra värdet på befintliga
             $push för att append:a värden till en array i dokumentet
             */
        });
    }
}
