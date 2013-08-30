var SPACE   = /[ \r\n\t]/;
var ATOM    = /[^\(\)\r\n\t ]/;
var NUMBER  = /^-?\d+(?:\.\d+)?$/

function sexp(source) {

    var ix  = 0,
        len = source.length;

    function parseAtom() {
        var start = ix++;
        while (ATOM.test(source[ix]))
            ix++;
        var atom = source.substring(start, ix);
        if (NUMBER.test(atom)) {
            return parseFloat(atom);
        } else {
            return atom;
        }
    }

    function parseSexp() {

        while (SPACE.test(source[ix]))
            ix++;

        if (source[ix++] !== '(')
            throw new Error("parse error");

        var items   = [],
            state   = 'out',
            start   = null;

        while (ix < source.length) {
            var ch = source[ix];
            if (ch === ')') {
                ix++;
                return items;
            } else if (ch === '(') {
                items.push(parseSexp());
            } else if (SPACE.test(ch)) {
                ix++;
            } else {
                items.push(parseAtom());
            }
        }

        throw new Error("parse error");

    }

    return parseSexp();

}

module.exports = sexp;