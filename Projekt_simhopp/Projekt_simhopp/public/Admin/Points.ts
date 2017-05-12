
class Points {

    public point: number = 0;
    public pointList: Array<number>;

    //set-get functions
    public set setPoint(p: number) { this.point = p; }
    public get getPoint(): number { return this.point; }

    public set setPointList(plist: Array<number>) { this.pointList = plist; }
    public get getPointList(): Array<number> { return this.pointList; }

    //funktion för att räkan ut poängen, dock inte testad ännu!
    public calculatePoint(difficulty: any): void {
        var min;
        var max;
        if (this.pointList.length < 5) {
            var resultUnder5: number;
            for (var i = 0; i < this.pointList.length; i++) {
                resultUnder5 = resultUnder5 + this.pointList[i];
            }

            resultUnder5 = resultUnder5 * difficulty;
            this.point += resultUnder5;
        }
        else if (this.pointList.length === 5) {
            var resultEqual5: number;
            for (var i = 0; i < this.pointList.length; i++) {
                if (this.pointList[i] < min) {
                    min = this.pointList[i];
                }

                if (this.pointList[i] > max) {
                    max = this.pointList[i];
                }
            }
           
            for (var j = 0; j < this.pointList.length; j++) {
                if (this.pointList[j] === min || this.pointList[j] === max) {
                    this.pointList.splice(j, max);

                }
                else if (this.pointList[j] === min) {
                    this.pointList.splice(j,min);
                }
                else {
                    resultEqual5 = resultEqual5 + this.pointList[j];  
                }
                
            }
            resultEqual5 = resultEqual5 * difficulty;
            this.point += resultEqual5;


        }
        else if (this.pointList.length >= 7) {
            
            var resultOver7: number;
            for (var i = 0; i < this.pointList.length; i++) {
                if (this.pointList[i] < min) {
                    min = this.pointList[i];
                }

                if (this.pointList[i] > max) {
                    max = this.pointList[i];
                }
            }

            for (var j = 0; j < this.pointList.length; j++) {
                if (this.pointList[j] === min || this.pointList[j] === max) {
                    this.pointList.splice(j, max);

                }
                else if (this.pointList[j] === min) {
                    this.pointList.splice(j, min);
                }
                else {
                    resultOver7 = resultOver7 + this.pointList[j];
                }

            }
            resultOver7 = resultOver7 * difficulty;
            this.point += resultOver7;

        }
 
    }
}