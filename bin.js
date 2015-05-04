var program = require('commander');
var pasteTable = require('./index.js');

program
  .version('0.0.0')
  .option('-t, --tab-delimited', 'Tab delimit data')
  .option('-c, --column <n>', 'Which column to return (zero-based)', parseInt)
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
  var table = pasteTable.read(data.join("\n"));
  var delimiter = ',';
  if (program.tabDelimited) {
    delimiter = "\t";
  }

  if (typeof table[0].hasOwnProperty !== 'undefined' && table[0].length > 1) {
    table.forEach(function(row) {
      if (!isNaN(program.column)) {
        if (row.length > program.column) {
          console.log(row[program.column]);
          return;
        }
        return;
      }
      console.log(row.join(delimiter));
    });
    return;
  }
  console.log(table.join(delimiter));
});
