export class TestServer {
    private eventTestPageZero: string = 'ev-test-page-zero';
    private eventTestPageOne: string = 'ev-test-page-one';
    private eventTestPageTwo: string = 'ev-test-page-two';

    private socket: any = null;

    constructor(socket: any) {
        this.socket = socket;
        this.onEmitZero();
    }

    private onEmitZero = () => {
        var self = this;

        var json: any = {
            sectionOne: 'Introduktion',
            contentOne: `Exemplet skall visa på vad som kan göras med node, express och socketio samt att att programmera en applikation bestående av en webbsida.`,
            sectionTwo: 'Filhantering på servern',
            contentTwo: 'Med modulen fs i node kan datorns filsystem hanteras'
        }
        this.socket.emit(this.eventTestPageZero, json);

        this.socket.on(this.eventTestPageOne,
            (reply: any) => {
                self.onRequestOne();
            });

        this.socket.on(this.eventTestPageTwo,
            (reply: any) => {
                self.onRequestTwo();
            });
    }


    private onRequestOne = () => {
        var self = this;

        var json: any = {
            dataOne: 'Data 1 for page ONE',
            dataTwo: `Data 2 for page ONE`,
        }

        this.socket.emit(this.eventTestPageOne, json);
    }

    private onRequestTwo = () => {
        var json: any = {
            dataOne: 'Data 1 for page TWO',
            dataTwo: `Data 2 for page TWO`,
        }

        this.socket.emit(this.eventTestPageTwo, json);
    }


}