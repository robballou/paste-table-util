var should = require('should');
var pasteTable = require('../index.js');

describe('split', function() {
  it('should return multiple items for piped lines', function() {
    var results = pasteTable.split('123 | 456');
    results.should.be.an.array;
    results.should.have.length(2);
    results[0].should.equal('123 ');
    results[1].should.equal(' 456');
  });

  it('should return multiple items for tab delimited lines', function() {
    var string = "123" + "\t" + "456";
    var results = pasteTable.split(string);
    results.should.be.an.array;
    results.should.have.length(2);
    results[0].should.equal('123');
    results[1].should.equal('456');
  });

  it('should return multiple items for multiple-space delimited lines', function() {
    var string = "123    456";
    var results = pasteTable.split(string);
    results.should.be.an.array;
    results.should.have.length(2);
    results[0].should.equal('123');
    results[1].should.equal('456');
  });

  it('should return multiple items for comma delimited lines', function() {
    var results = pasteTable.split('123,456');
    console.log(results);
    // results.should.be.an.array;
    // results.should.have.length(2);
    // results[0].should.equal('123 ');
    // results[1].should.equal(' 456');
  });
});
