///<reference path="./Diver.ts"/>
var Competition = (function () {
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
    //jobba med detta denna vecka
    Competition.prototype.startCompetition = function () {
        console.log("Tävling startade!");
        for (var i = 0; i < this.numberOfJumps; i++) {
            for (var j = 0; j < this.numberOfContestants; j++) {
            }
        }
    };
    return Competition;
}());
//# sourceMappingURL=Competition.js.map