var assert = require('assert');
var fs = require('fs');
var path = require('path');
var babel = require('babel-core');

function test(name) {
  it(name, function () {
    var fixturePath = path.resolve(__dirname, name, 'fixture.js');
    var expectedPath = path.resolve(__dirname, name, 'expected.js');

    var carriedgeReturn = /[\r]/g;

    var actual = babel.transformFileSync(fixturePath, { plugins: ['../../index.js'] })
      .code.replace(carriedgeReturn, '');
    var expected = fs.readFileSync(expectedPath, { encoding: 'utf8' })
      .replace(carriedgeReturn, '');

    assert.equal(actual, expected);
  });
}

['no-decorator', 'inline', 'inline-exported'].map(test);