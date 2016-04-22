var should = require('should');
var pasteTable = require('../index.js');

function mockProgram() {
  return pasteTable.program();
}

describe('paste table', function() {
  describe('should handle mysql cli output', function() {
    it('with a single column, single row', function() {
      var data = '+---------+\n| 117700 |\n+---------+\n';
      var program = mockProgram();
      should(pasteTable.commandLine(data.split('\n'), program)).equal('117700');
    });

    it('with multiple rows, single column', function () {
      var data = '+---------+\n| 50300  |\n| 135800 |\n| 25800  |\n| 69700  |\n| 11200  |\n| 105400 |\n| 81500  |\n| 48600  |\n| 35600  |\n| 117700 |\n+---------+';
      var program = mockProgram();
      should(pasteTable.commandLine(data.split('\n'), program)).equal('50300,135800,25800,69700,11200,105400,81500,48600,35600,117700');
    });

    it('with multiple rows, multiple columns', function () {
      var data = '+-----+------+\n|   1 |    1 |\n|   3 |    3 |\n|   4 |    4 |\n|   5 |    5 |\n|   6 |    6 |\n+-----+------+';
      var program = mockProgram();
      var output = pasteTable.commandLine(data.split('\n'), program);
      output.should
        .be.type('object')
        .and
        .have.length(5);
      should(output[0]).equal('1,1');
    });

    it('with multiple rows, multiple columns and selecting one of them', function () {
      var data = '+-----+------+\n|   1 |    1 |\n|   3 |    3 |\n|   4 |    4 |\n|   5 |    5 |\n|   6 |    6 |\n+-----+------+';
      var program = mockProgram();
      program.column = 0;
      var output = pasteTable.commandLine(data.split('\n'), program);
      output.should
        .be.type('object')
        .and
        .have.length(5);
      should(output[0]).equal(1);
    });

  });
});
