class Weights {
    constructor(str) {
        this.left = [];
        this.bottom = [];

        let weights = str.split(';');

        for (let i = weights.length - 1; i >= 0; i--) {
            if (i % 2) {
                this.bottom.push(weights[i].split(',').map(weight => parseFloat(weight)));
                continue;
            }
            this.left.push(weights[i].split(',').map(weight => parseFloat(weight)));
        }
    }
}
