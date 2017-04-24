"use strict";
var Points_1 = require("./Points");
var Jump = (function () {
    function Jump() {
        this.jumpPoints = new Points_1.Points();
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
    Object.defineProperty(Jump.prototype, "setDificultye", {
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
        set: function (point) { this.jumpPoints = point; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jump.prototype, "getJumpPoints", {
        get: function () { return this.jumpPoints; },
        enumerable: true,
        configurable: true
    });
    return Jump;
}());
exports.Jump = Jump;
//# sourceMappingURL=Jump.js.map