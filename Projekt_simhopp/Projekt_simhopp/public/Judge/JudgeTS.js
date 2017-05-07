var TestClient = (function () {
    function TestClient(socket) {
        var _this = this;
        this.socket = null;
        this.containerTags = function () {
            var s = "\n            <div id=\"id-div-main\" class=\"container-fluid\"></div>\n        ";
        };
        this.pageZero = function () {
            _this.containerTags();
            var s = "\n            <center>\n            <h2>Judge</h2>\n            <Select>\n            <option>0.5</option>\n            <option>1.0</option>\n            <option>1.5</option>\n            <option>2.0</option>\n            <option>2.5</option>\n            <option>3.0</option>\n            <option>3.5</option>\n            <option>4.0</option>\n            <option>4.5</option>\n            <option>5.0</option>\n            <option>5.5</option>\n            <option>6.0</option>\n            <option>6.5</option>\n            <option>7.0</option>\n            <option>7.5</option>\n            <option>8.0</option>\n            <option>8.5</option>\n            <option>9.0</option>\n            <option>9.5</option>\n            <option>10</option>\n            </Select>\n            </center>\n            <h4 id=\"id-p-content-one\"></h4>\n            <h3 id=\"id-h3-section-two\"></h3>\n            <p id=\"id-p-content-two\"></p>\n       ";
        };
        this.socket = socket;
        this.pageZero();
    }
    return TestClient;
}());
//# sourceMappingURL=JudgeTS.js.map