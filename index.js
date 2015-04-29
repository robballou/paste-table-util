pasteTable = {
  processLine: function(line) {
    var lineData = line.split('\|');
    lineData = lineData.filter(function(value) {
      if (value) {
        if (/^\+-+\+$/.test(value)) {
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
  }
};

module.exports = pasteTable;
