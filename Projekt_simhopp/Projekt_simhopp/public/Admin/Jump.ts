import {Points} from "./Points";

export class Jump {

    public jumpCode: string;
    public difficulty: number;
    public height: number;
    public jumpPoints: Points = new Points();

    //set-get functions
    public set setJumpCode(code: string) { this.jumpCode = code; }
    public get getJumpCode(): string { return this.jumpCode; }

    public set setDificultye(diff: number) { this.difficulty = diff; }
    public get getDifficulty(): number { return this.difficulty; }

    public set setHeight(height: number) { this.height = height; }
    public get getHeight(): number { return this.height; }

    public set setJumpPoints(point: Points) { this.jumpPoints = point; }
    public get getJumpPoints(): Points { return this.jumpPoints; }
   
    
}