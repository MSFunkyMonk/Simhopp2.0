"use strict";
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
    Points.prototype.calculatePoint = function (difficulty) {
        if (this.pointList.length < 5) {
            var result;
            for (var i = 0; i < this.pointList.length; i++) {
                result = result + this.pointList[i];
            }
            result = result * difficulty;
            this.point += result;
        }
        else if (this.pointList.length === 5) {
        }
    };
    return Points;
}());
exports.Points = Points;
//# sourceMappingURL=Points.js.map