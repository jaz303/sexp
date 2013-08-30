var test = require('tape');
var sexp = require('../');

test("parsing", function(assert) {

    var input = "(foo bar 1 2 3 (('a string' \"another string\")) + - splat)";
    
    var output = [
        'foo',
        'bar',
        1,
        2,
        3,
        [
            [
                'a string',
                "another string"
            ]
        ],
        '+',
        '-',
        'splat'
    ];

    assert.deepEqual(sexp(input), output);
    assert.end();

});
