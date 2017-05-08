///<reference path="./Diver.ts"/>
var socket = (function () {
    function Competition() {
        this.diverList = new Array();
    }
    Object.defineProperty(Competition.prototype, "setDiverList", {
        set: function (diverName) { this.diverList = diverName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Competition.prototype, "getDiverlist", {
        get: function () { return this.diverList; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Competition.prototype, "setNumberOfContestants", {
        set: function (amount) { this.numberOfContestants = amount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Competition.prototype, "getNumberOfContestants", {
        get: function () { return this.numberOfContestants; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Competition.prototype, "setNumberOfJudges", {
        set: function (amount) { this.numberOfJudges = amount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Competition.prototype, "getNumberOfJudges", {
        get: function () { return this.numberOfJudges; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Competition.prototype, "setNumberOfJumps", {
        set: function (amount) { this.numberOfJumps = amount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Competition.prototype, "getNumberOfJumps", {
        get: function () { return this.numberOfJumps; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Competition.prototype, "setNameOfCompetition", {
        set: function (compName) { this.nameOfCompetition = compName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Competition.prototype, "getNameOfCompetition", {
        get: function () { return this.nameOfCompetition; },
        enumerable: true,
        configurable: true
    });
    //jobba med detta denna vecka//håll igång!
    Competition.prototype.startCompetition = function (comp, socket) {
        console.log("Tävling startade!");
        for (var jump = 0; jump < comp.numberOfJumps; jump++) {
            //omgång
            for (var diver = 0; diver < comp.numberOfContestants; diver++) {
            }
        }
    };
    return Competition;
}());
//# sourceMappingURL=Competition.js.map