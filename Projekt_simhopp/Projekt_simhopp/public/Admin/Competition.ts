///<reference path="./Diver.ts"/>

class Competition {

    public nameOfCompetition: string;
    public numberOfJumps: number;
    public numberOfJudges: number;
    public numberOfContestants: number;
    public diverList: Array<Diver> = new Array<Diver>();

    public set setDiverList(diverName: Array<Diver>) { this.diverList = diverName; }
    public get getDiverlist(): Array<Diver> { return this.diverList; }


    public set setNumberOfContestants(amount: number) { this.numberOfContestants = amount; }
    public get getNumberOfContestants(): number { return this.numberOfContestants; }


    public set setNumberOfJudges(amount: number) { this.numberOfJudges = amount; }
    public get getNumberOfJudges(): number { return this.numberOfJudges; }


    public set setNumberOfJumps(amount: number) { this.numberOfJumps = amount; }
    public get getNumberOfJumps(): number { return this.numberOfJumps; }


    public set setNameOfCompetition(compName: string) { this.nameOfCompetition = compName; }
    public get getNameOfCompetition(): string { return this.nameOfCompetition; }

    //jobba med detta denna vecka
    public startCompetition(comp: any): void {
        
        console.log("Tävling startade!");
        var reciever = [];
        for (var jump = 0; jump < comp.numberOfJumps; jump++) {
            //omgång
            var i = 0;
            
            for (var diver = 0; diver < comp.numberOfContestants; diver++) {
                //kolla vilket format den msåte skickas på, objekt blir lite skumt
                judge.emit('compInfo', {comp});
               
                while (1) {


                 //väntar på att dommare ska döma
                    while (dömda_poäng !== comp.getNumberOfJudges) {
                        console.log("väntar på domare!");
                        if (dömda_poäng !== 0) {
                            reciever[i].add(dömda_poäng);
                            i += 1;
                        }
                    }
                    if (dömda_poäng === comp.getNumberOfJudges) 
                        break;
                    
                }

                //tar emot 
                for (var points of reciever) {
                    var point = points;
                    comp.diverList[diver].jumpList[jump].jumpPoints.pointList.add(point);
                }
                

                comp.diverList[diver].jumpList[jump].calculatePoint(comp.diverList[diver].jumpList[jump].difficulty);

            }
           
        }

    }
}