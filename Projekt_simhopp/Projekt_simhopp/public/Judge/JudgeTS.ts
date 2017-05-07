class TestClient {
    private socket: any = null;

    constructor(socket: any) {
        this.socket = socket;
        this.pageZero();
    }

    private containerTags = () => {
        var s = `
            <div id="id-div-main" class="container-fluid"></div>
        `;
    }

    private pageZero = () => {
        this.containerTags();
        var s = `
            <center>
            <h2>Judge</h2>
            <Select>
            <option>0.5</option>
            <option>1.0</option>
            <option>1.5</option>
            <option>2.0</option>
            <option>2.5</option>
            <option>3.0</option>
            <option>3.5</option>
            <option>4.0</option>
            <option>4.5</option>
            <option>5.0</option>
            <option>5.5</option>
            <option>6.0</option>
            <option>6.5</option>
            <option>7.0</option>
            <option>7.5</option>
            <option>8.0</option>
            <option>8.5</option>
            <option>9.0</option>
            <option>9.5</option>
            <option>10</option>
            </Select>
            </center>
            <h4 id="id-p-content-one"></h4>
            <h3 id="id-h3-section-two"></h3>
            <p id="id-p-content-two"></p>
       `;
    }
}