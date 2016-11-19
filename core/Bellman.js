class Bellman {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        
        this.grid = new Grid(rows, columns);
        this.grid.eachNode((node, i, j, nodes) => {
            if (i > 0) {
                node.bottom = {
                    node: nodes[i - 1][j]
                }
            }
            if (j > 0) {
                node.left = {
                    node: nodes[i][j - 1]
                }
            }
        })
    }

    bindWeights(weights) {
        this.grid.eachNode(node => {
            let left = node.left;
            if (left) {
                let leftNode = left.node;
                left.weight = weights.left[leftNode.row][leftNode.column];
            }
            let bottom = node.bottom;
            if (bottom) {
                let bottomNode = bottom.node;
                bottom.weight = weights.bottom[bottomNode.row][bottomNode.column];
            }
        })
    }
}
