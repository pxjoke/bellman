var rows = 3;
var columns = 4;
var grid = [];

for (let i = 0; i < rows; i++) {
    let row = [];

    for (let j = 0; j < columns; j++) {
        row.push(new Node(i, j));
    }

    grid.push(row);
}

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        if (i > 0) {
            grid[i][j].bottom = {
                node: grid[i - 1][j]
            }
        }
        if (j > 0) {
            grid[i][j].left = {
                node: grid[i][j - 1]
            }
        }
    }
}

var str = '1, 2, 3; 4, 5, 6, 7; 8, 9, 10; 11, 12, 13, 14; 15, 16, 17';
let weights = str.split(';');
var leftWeights = [];
var bottomWeights = [];

for (let i = weights.length - 1; i >= 0; i--) {
    if (i % 2) {
        bottomWeights.push(weights[i].split(','));
        continue;
    }
    leftWeights.push(weights[i].split(','));
}

console.dir(str);
console.dir(weights);
console.dir(leftWeights);
console.dir(bottomWeights);
console.dir(grid);
