var csvparse = require('csv-parse/lib/sync');
var program = require('commander');

pasteTable = {

  commandLine: function (data, program) {
    var table = this.read(data.join('\n'));
    var delimiter = ',';
    if (program.tabDelimited) {
      delimiter = '\t';
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

        return newTable.join(delimiter);
      }

      var output = [];
      table.forEach(function (row) {
        if (columnSelected) {
          // numeric column
          if (numericColumn && row.length > program.column) {
            output.push(row[program.column]);
            return;
          }

          if (columnRange) {
            ouput.push(row.slice(minRange, maxRange).join(delimiter));
            return;
          }

          if (multicolumn) {
            var newRow = [];
            columns.forEach(function (col) {
              newRow.append(row[col]);
            });

            output.push(newRow.join(delimiter));
            return;
          }

          return;
        }

        output.push(row.join(delimiter));
      });

      return output;
    }

    return table.join(delimiter);
  },

  /**
   * Process the line and figure out what we need to do with it...
   */
  processLine: function (line) {
    // get the line data
    var lineData = pasteTable.split(line);

    // and filter it
    lineData = lineData.filter(function (value) {
      if (value) {
        // filter out mysql table lines
        if (/^\+[\-\+]+\+$/.test(value)) {
          return false;
        }

        return true;
      }

      // no value?
      return false;
    });

    // parse the value
    lineData = lineData.map(function (value) {
      value = value.trim();
      if (/^\d+$/.test(value)) {
        return parseInt(value, 10);
      }

      return value;
    });

    return lineData;
  },

  /**
   * Return the CLI program.
   */
  program: function () {
    return program
      .version('0.0.0')
      .option('-t, --tab-delimited', 'Tab delimit data')
      .option('-c, --column <n>', 'Which column to return (zero-based), list of columns, or range of columns')
      .option('-l, --list', 'Return data as a list of values')
  },

  /**
   * Read the data.
   */
  read: function (data) {
    var lines = data.split('\n');
    var linesData = [];
    lines.forEach(function (line, index) {
      var lineData = pasteTable.processLine(line);
      if (lineData && lineData.length > 0) {
        linesData.push(lineData);
      }
    });

    return linesData;
  },

  /**
   * Split the line into chunks based on delimiters
   */
  split: function (line) {
    // check for vertical pipes
    if (line.indexOf('|') >= 0) {
      return line.split('\|');
    }

    // check for tabs
    if (/\t/.test(line)) {
      return line.split(/\t/);
    }

    // check if there are multiple spaces
    if (/\s{2,}/.test(line)) {
      return line.split(/\s{2,}/);
    }

    // check if there are commas
    if (/,/.test(line)) {
      return csvparse(line, {})[0];
    }

    return [line];
  },
};

module.exports = pasteTable;
