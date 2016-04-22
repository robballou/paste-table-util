#!/usr/bin/env node
var program = require('commander');
var pasteTable = require('./index.js');

program = pasteTable.program();
program
  .parse(process.argv);

var data = [];
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    data.push(chunk);
  }
});

process.stdin.on('end', function() {
  var output = pasteTable.commandLine(data, program);
  console.log(output);
});
