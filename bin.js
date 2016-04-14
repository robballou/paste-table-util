var program = require('commander');
var pasteTable = require('./index.js');

program
  .version('0.0.0')
  .option('-t, --tab-delimited', 'Tab delimit data')
  .option('-c, --column <n>', 'Which column to return (zero-based), list of columns, or range of columns')
  .option('-l, --list', 'Return data as a list of values')
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

    // figure out which (if any) column selection is being used.
    var columnSelected = !isNaN(program.column);
    var numericColumn = false;
    var columnRange = false;
    var minRange = false;
    var maxRange = false;
    var multicolumn = false;
    var columns = [];

    if (columnSelected && /^\d+$/.test(program.column)) {
      numericColumn = true;
    }
    else if (columnSelected && program.column.indexOf(',') !== -1) {
      multicolumn = true;
      columns = program.column.split(',');
      columns = columns.map(parseInt, 10);
    }
    else if (columnSelected && program.column.indexOf('-') !== -1) {
      columnRange = true;
      var range = program.column.split('-');
      minRange = parseInt(range[0], 10);
      maxRange = parseInt(range[1], 10);
    }

    if (program.list) {
      delimiter = ',';
    }

    if (numericColumn && program.list) {
      var newTable = [];

      table.forEach(function (row) {
        newTable.push([row[program.column]]);
      });

      console.log(newTable.join(delimiter));
      return;
    }

    table.forEach(function (row) {
      if (columnSelected) {
        // numeric column
        if (numericColumn && row.length > program.column) {
          console.log(row[program.column]);
          return;
        }

        if (columnRange) {
          console.log(row.slice(minRange, maxRange).join(delimiter));
          return;
        }

        if (multicolumn) {
          var newRow = [];
          columns.forEach(function(col) {
            newRow.append(row[col]);
          });

          console.log(newRow.join(delimiter));
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
