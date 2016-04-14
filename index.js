var csvparse = require('csv-parse');

pasteTable = {

  /**
   * Process the line and figure out what we need to do with it...
   */
  processLine: function(line) {
    var lineData = pasteTable.split(line)
    lineData = lineData.filter(function(value) {
      if (value) {
        if (/^\+[\-\+]+\+$/.test(value)) {
          return false;
        }
        return true;
      }
      return false;
    });
    lineData = lineData.map(function(value) {
      value = value.trim();
      if (/^\d+$/.test(value)) {
        return parseInt(value, 10);
      }
      return value;
    });
    return lineData;
  },

  read: function(data) {
    var lines = data.split('\n'),
      linesData = [];
    lines.forEach(function(line, index) {
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
  split: function(line) {
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
      return csvparse(line, {});
    }

    return [line];
  }
};

module.exports = pasteTable;
