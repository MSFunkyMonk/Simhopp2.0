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
    Competition.prototype.startCompetition = function (comp) {
        console.log("Tävling startade!");
        var reciever = [];
        for (var jump = 0; jump < comp.numberOfJumps; jump++) {
            //omgång
            var i = 0;
            for (var diver = 0; diver < comp.numberOfContestants; diver++) {
                judge.emit('compInfo', { comp: comp });
                //väntar på att dommare ska döma
                while (dömda_poäng != comp.getNumberOfJudges) {
                    console.log("väntar på domare!");
                    if (dömda_poäng != 0) {
                        reciever[i].add(dömda_poäng);
                        i += 1;
                    }
                }
                //tar emot 
                for (var _i = 0, reciever_1 = reciever; _i < reciever_1.length; _i++) {
                    var points = reciever_1[_i];
                    var point = points;
                    comp.diverList[diver].jumpList[jump].jumpPoints.pointList.add(point);
                }
                comp.diverList[diver].jumpList[jump].calculatePoint(comp.diverList[diver].jumpList[jump].difficulty);
            }
        }
    };
    return Competition;
}());
//# sourceMappingURL=Competition.js.map