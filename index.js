var rows = 3;
var columns = 4;

var bellman = new Bellman(rows, columns);

var grid = bellman.grid.nodes;

var str = '1, 2, 3; 4, 5, 6, 7; 8, 9, 10; 11, 12, 13, 14; 15, 16, 17';
var weights = new Weights(str);
bellman.bindWeights(weights);
bellman.run();
let viewData = bellman.getViewData();

console.log('str');
console.dir(str);
console.log('view');
console.dir(viewData);
console.log('left');
console.dir(weights.left);
console.log('bottom');
console.dir(weights.bottom);
console.log('grid');
console.dir(grid);
