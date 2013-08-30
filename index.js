var SPACE   = /[ \r\n\t]/;
var ATOM    = /[^\(\)\r\n\t ]/;

function sexp(source) {

    var ix  = 0,
        len = source.length;

    function parseAtom() {
        var start = ix++;
        while (ATOM.test(source[ix]))
            ix++;
        return source.substring(start, ix);
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