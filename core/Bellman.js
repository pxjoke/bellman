class Bellman {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;

        this.grid = new Grid(rows, columns);
        this.grid.eachNode((node, i, j, nodes) => {
            if (i > 0) {
                node.bottom = {
                    node: nodes[i - 1][j],
                    edge: {}
                }
            }
            if (j > 0) {
                node.left = {
                    node: nodes[i][j - 1],
                    edge: {}
                }
            }
        });
        this.grid.eachNode((node) => {
            if (node.bottom) {
                node.bottom.node.up = {
                    node: node,
                    edge: node.bottom.edge
                };
            }
            if (node.left) {
                node.left.node.right = {
                    node: node,
                    edge: node.left.edge
                };
            }
        });
    }

    bindWeights(weights) {
        this.grid.eachNode(node => {
            let left = node.left;
            if (left) {
                let leftNode = left.node;
                left.edge.weight = weights.left[leftNode.row][leftNode.column];
            }
            let bottom = node.bottom;
            if (bottom) {
                let bottomNode = bottom.node;
                bottom.edge.weight = weights.bottom[bottomNode.row][bottomNode.column];
            }
        })
    }

    run() {
        this.grid.eachDiagNode(node => {
            let current = node;
            while (current) {
                this.computeNode(current);
                current = current.bottom && current.bottom.node;
            }
            current = node;
            while (current) {
                this.computeNode(current);
                current = current.left && current.left.node;
            }

        });
        this.findPath();
    }

    computeNode(node) {
        let up = node.up,
            right = node.right,
            fromUp = up && (up.edge.weight + up.node.value) || Infinity,
            fromRight = right && (right.edge.weight + right.node.value) || Infinity;

        node.value = 0;
        if (fromUp < fromRight) {
            node.value = fromUp;
            up.edge.selected = true;
        }
        if (fromRight < fromUp) {
            node.value = fromRight;
            right.edge.selected = true;
        }
    }

    findPath() {
        this.findDirection(this.grid.nodes[0][0]);
    }

    findDirection(node) {
        if (node.up && node.up.edge.selected) {
            node.up.edge.active = true;
            this.findDirection(node.up.node);
        }
        if (node.right && node.right.edge.selected) {
            node.right.edge.active = true;
            this.findDirection(node.right.node);
        }
    }

    getViewData() {
        let rows = [],
            rowHead = this.grid.nodes[0][0];
            while(rowHead) {
                let bubbleRow = [],
                    arrowRow = [],
                    current = rowHead;
                while(current) {
                    let up = current.up;
                    let right = current.right;
                    bubbleRow.push(
                        {
                            type: 'bubble',
                            value: current.value
                        }
                    );
                    if (up) {
                        arrowRow.push(
                            {
                                type: 'arrow',
                                direction: 'up',
                                active: up.edge.active,
                                value: up.edge.weight
                            }
                        );
                    }
                    if (right) {
                        bubbleRow.push(
                            {
                                type: 'arrow',
                                direction: 'right',
                                active: right.edge.active,
                                value: right.edge.weight
                            }
                        );
                        if (up) {
                            arrowRow.push({type: ''});
                        }
                    }
                    current = right && right.node;
                }
                rowHead = rowHead.up && rowHead.up.node;
                rows.push({
                    cells: bubbleRow
                });
                if (arrowRow.length) {
                    rows.push({
                        cells: arrowRow
                    });
                }
            }
        return rows.reverse();
    }
}
