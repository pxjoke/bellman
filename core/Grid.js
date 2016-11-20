class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;

        this.nodes = [];

        for (let i = 0; i < rows; i++) {
            let row = [];

            for (let j = 0; j < columns; j++) {
                row.push(new Node(i,j));
            }

            this.nodes.push(row);
        }
    }

    eachNode(callback) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                callback(this.nodes[i][j], i, j, this.nodes);
            }
        }
    }

    eachDiagNode(callback) {
        for(let i = this.rows - 1, j = this.columns - 1; i >= 0 && j >= 0; i--, j--) {
            callback(this.nodes[i][j], i, j, this.nodes);
        }
    }
}
