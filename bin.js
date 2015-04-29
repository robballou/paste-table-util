var program = require('commander');
var pasteTable = require('./index.js');

program
  .version('0.0.0')
  .parse(process.argv);

console.log(program);

var data = [];
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    data.push(chunk);
  }
});

process.stdin.on('end', function() {
  var table = pasteTable.read(data.join("\n"));
  console.log(table.join(','));
});
