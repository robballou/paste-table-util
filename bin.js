#!/usr/bin/env node
const pasteTable = require('./index.js');

program = pasteTable.program();
program
  .parse(process.argv);

const data = [];
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    data.push(chunk);
  }
});

process.stdin.on('end', function() {
  const output = pasteTable.commandLine(data, program);
  console.log(output);
});
