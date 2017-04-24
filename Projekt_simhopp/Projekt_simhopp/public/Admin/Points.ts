
export class Points {

    public point: number = 0;
    public pointList: Array<number> = new Array<number>();

    //set-get functions
    public set setPoint(p: number ){ this.point = p; }
    public get getPoint(): number { return this.point; }

    public set setPointList(plist: Array<number>) { this.pointList = plist; }
    public get getPointList(): Array<number> { return this.pointList; }


    public calculatePoint(difficulty: any): void {

        if (this.pointList.length < 5) {
            var result: number;
            for (var i = 0; i < this.pointList.length; i++) {
                result = result + this.pointList[i];
            }

            result = result * difficulty;
            this.point += result;
        }
        else if (this.pointList.length === 5) {
            
        }
    }
}