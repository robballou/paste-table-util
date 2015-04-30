var program = require('commander');
var pasteTable = require('./index.js');

program
  .version('0.0.0')
  .option('-t, --tab-delimited', 'Tab delimit data')
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
  var delimiter = ',';
  if (program.tabDelimited) {
    delimiter = "\t";
  }

  if (typeof table[0].hasOwnProperty !== 'undefined' && table[0].length > 1) {
    table.forEach(function(row) {
      console.log(row.join(delimiter));
    });
    return;
  }
  console.log(table.join(delimiter));
});
