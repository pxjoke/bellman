let defaultWeights =
    '10, 4, 10, 5, 2, 5, 3;\n' +
    '4, 7, 4, 6, 2, 6, 9, 9;\n' +
    '1, 10, 2, 8, 10, 10, 5;\n' +
    '9, 6, 4, 8, 3, 4, 8, 7;\n' +
    '10, 8, 7, 4, 9, 4, 5;\n' +
    '9, 6, 5, 9, 8, 7, 4, 7;\n' +
    '4, 3, 8, 6, 5, 3, 5;\n' +
    '6, 9, 10, 10, 5, 10, 9, 8;\n' +
    '10, 5, 1, 4, 1, 8, 9;\n' +
    '5, 3, 8, 5, 3, 4, 3, 2;\n' +
    '4, 10, 2, 7, 3, 8, 3;\n' +
    '9, 3, 1, 4, 3, 8, 6, 4;\n' +
    '5, 5, 10, 5, 1, 2, 9;\n' +
    '2, 4, 9, 2, 7, 7, 10, 2;\n' +
    '5, 9, 8, 10, 4, 1, 8';

$('#gridRows').val(8);
$('#gridColumns').val(8);
$('#weightsInput').val(defaultWeights);

$('#runBtn').click((e) => {
    let rows = $('#gridRows').val();
    let columns = $('#gridColumns').val();
    let weightsValues = $('#weightsInput').val();

    let bellman = new Bellman(rows, columns);

    var grid = bellman.grid.nodes;

    var str = '1, 2, 3; 4, 5, 6, 7; 8, 9, 10; 11, 12, 13, 14; 15, 16, 17';
    var weights = new Weights(weightsValues);
    bellman.bindWeights(weights);
    bellman.run();
    let viewData = bellman.getViewData();

    $('.grid').html(template(viewData));
});



Handlebars.registerHelper('if_eq', function (a, b, opts) {
    if (a === b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});


let templateHTML = $('#grid-template').html();

let template = Handlebars.compile(templateHTML);
