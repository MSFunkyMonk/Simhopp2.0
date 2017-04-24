"use strict";
var Diver = (function () {
    function Diver() {
        this.jumpList = new Array();
    }
    Object.defineProperty(Diver.prototype, "setDiverName", {
        //set-get functions
        set: function (name) { this.diverName = name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Diver.prototype, "getDiverName", {
        get: function () { return this.diverName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Diver.prototype, "setNationality", {
        set: function (country) { this.nationality = country; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Diver.prototype, "getNationality", {
        get: function () { return this.nationality; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Diver.prototype, "setJumpList", {
        set: function (jumpName) { this.jumpList = jumpName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Diver.prototype, "getJumplist", {
        get: function () { return this.jumpList; },
        enumerable: true,
        configurable: true
    });
    Diver.prototype.diverTotalScore = function () {
        var result = 0;
        for (var i = 0; i < this.jumpList.length; i++) {
            result += this.jumpList[i].jumpPoints.point;
        }
        return result;
    };
    return Diver;
}());
exports.Diver = Diver;
//# sourceMappingURL=Diver.js.map