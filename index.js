var tokenize = require('sexp-tokenizer');

module.exports = sexp;

function sexp(source, opts) {

    var stream = tokenize(opts);

    var curr = [], stack = [];

    stream.on('data', function(obj) {
        if (obj === tokenize.OPEN) {
            var newSexp = [];
            curr.push(newSexp);
            stack.push(curr);
            curr = newSexp;
        } else if (obj === tokenize.CLOSE) {
            curr = stack.pop();
        } else {
            curr.push(obj);
        }
    });

    stream.write(source, {encoding: 'utf8'});

    return curr[0];

}