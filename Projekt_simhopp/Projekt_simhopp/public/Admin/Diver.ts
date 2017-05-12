///<reference path="./Jump.ts" />
class Diver {

    public diverName: string;
    public nationality: string;
    public jumpList: Array<Jump> = new Array<Jump>();


    //set-get functions
    public set setDiverName(name: string) { this.diverName = name; }
    public get getDiverName(): string { return this.diverName; }

    public set setNationality(country: string) { this.nationality = country; }
    public get getNationality(): string { return this.nationality; }

    public set setJumpList(jumpName: Array<Jump>) { this.jumpList = jumpName; }
    public get getJumplist(): Array<Jump> { return this.jumpList; }


    //public diverTotalScore(): number {
    //    var result = 0;
    //    for (var i = 0; i < this.jumpList.length; i++) {
    //        result += this.jumpList[i].jumpPoints[i].;
    //    }
    //    return result;
    //}




}