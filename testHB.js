Handlebars.registerHelper('if_eq', function (a, b, opts) {
    if (a === b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});



let struct = {
    rows: [
        {
            cells: [
                {
                    type: 'bubble',
                    value: 80
                },
                {
                    type: 'arrow',
                    direction: 'right'
                },
                {
                    type: 'bubble',
                    value: 65
                }
            ]
        },
        {
            cells: [
                {
                    type: 'arrow',
                    direction: 'up'
                },
                {
                    type: '',
                },
                {
                    type: 'arrow',
                    direction: 'up'
                }
            ]
        },
        {
            cells: [
                {
                    type: 'bubble',
                    value: 115
                },
                {
                    type: 'arrow',
                    direction: 'right',
                    active: true
                },
                {
                    type: 'bubble',
                    value: 55
                }
            ]
        }
    ]
};

let templateHTML = $('#grid-template').html();

let template = Handlebars.compile(templateHTML);
console.log(viewData);
$('.wrapper').append(template(viewData));
