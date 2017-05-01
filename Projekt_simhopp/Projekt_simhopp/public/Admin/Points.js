var Points = (function () {
    function Points() {
        this.point = 0;
        this.pointList = new Array();
    }
    Object.defineProperty(Points.prototype, "setPoint", {
        //set-get functions
        set: function (p) { this.point = p; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Points.prototype, "getPoint", {
        get: function () { return this.point; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Points.prototype, "setPointList", {
        set: function (plist) { this.pointList = plist; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Points.prototype, "getPointList", {
        get: function () { return this.pointList; },
        enumerable: true,
        configurable: true
    });
    //funktion för att räkan ut poängen, dock inte testad ännu!
    Points.prototype.calculatePoint = function (difficulty) {
        var min;
        var max;
        if (this.pointList.length < 5) {
            var resultUnder5;
            for (var i = 0; i < this.pointList.length; i++) {
                resultUnder5 = resultUnder5 + this.pointList[i];
            }
            resultUnder5 = resultUnder5 * difficulty;
            this.point += resultUnder5;
        }
        else if (this.pointList.length === 5) {
            var resultEqual5;
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
                    resultEqual5 = resultEqual5 + this.pointList[j];
                }
            }
            resultEqual5 = resultEqual5 * difficulty;
            this.point += resultEqual5;
        }
        else if (this.pointList.length >= 7) {
            var resultOver7;
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
    };
    return Points;
}());
//# sourceMappingURL=Points.js.map