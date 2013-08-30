# sexp

A simple s-expression parser. Turns this:

    (concat foo 1 (this and that "look here's a string"))

Into this:

    [ 'concat',
      'foo',
      1,
      [ 'this', 'and', 'that', 'look here\'s a string' ] ]

## Installation

    $ npm install sexp

## Usage

    var sexp = require('sexp');
    var ary = sexp("(foo bar 'string with spaces' 1 (2 3 4))")

## Limitations

  * Doesn't recognise escape sequences inside strings
