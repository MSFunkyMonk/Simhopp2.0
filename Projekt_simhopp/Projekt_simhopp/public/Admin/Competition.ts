import {Diver} from "./Diver";

class Competition {

    public diverList: Array<Diver> = new Array<Diver>();
    public set setDiverList(diverName: Array<Diver>) { this.diverList = diverName; }
    public get getDiverlist(): Array<Diver> { return this.diverList; }

    public numberOfContestants: number;
    public set setNUmberOfContestants(amount: number) { this.numberOfContestants = amount; }
    public get getNUmberOfContestants(): number { return this.numberOfContestants; }

    public numberOfJudges: number;
    public set setNumberOfJudges(amount: number) { this.numberOfJudges = amount; }
    public get getNumberOfJudges(): number { return this.numberOfJudges; }

    public numberOfJumps: number;
    public set setNumberOfJumps(amount: number) { this.numberOfJumps = amount; }
    public get getNumberOfJumps(): number { return this.numberOfJumps; }

    public nameOfCompetition: string;
    public set setNameOfCompetition(compName: string) { this.nameOfCompetition = compName; }
    public get getNameOfCompetition(): string { return this.nameOfCompetition; }

    
    public createCompetition(): void {
        
   
    }
}