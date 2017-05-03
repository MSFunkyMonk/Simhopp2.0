//import {Points} from "./Points";
///<reference path="./Points.ts" />
var Jump = (function () {
    function Jump() {
        this.jumpPoints = new Array();
    }
    Object.defineProperty(Jump.prototype, "setJumpCode", {
        //set-get functions
        set: function (code) { this.jumpCode = code; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jump.prototype, "getJumpCode", {
        get: function () { return this.jumpCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jump.prototype, "setDifficulty", {
        set: function (diff) { this.difficulty = diff; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jump.prototype, "getDifficulty", {
        get: function () { return this.difficulty; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jump.prototype, "setHeight", {
        set: function (height) { this.height = height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jump.prototype, "getHeight", {
        get: function () { return this.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jump.prototype, "setJumpPoints", {
        set: function (jlist) { this.jumpPoints = jlist; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jump.prototype, "getPointList", {
        get: function () { return this.jumpPoints; },
        enumerable: true,
        configurable: true
    });
    return Jump;
}());
//# sourceMappingURL=Jump.js.map