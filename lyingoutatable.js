

var TextCell_ = require ('./TextCell.js')
var TextCell = TextCell_.TextCell

var UnderlinedCell_ = require('./UnderlinedCell.js')
var UnderlinedCell = UnderlinedCell_.UnderlinedCell

var RTextCell_ = require('./RTextCell.js')
var RTextCell = RTextCell_.RTextCell

// Utils: Monkey Patching
String.prototype.repeat = function(times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += this;
  return result;
}

Array.prototype.range = function(block) {
  var r = [];
  for(var i = this[0]; i<this[1]; i++) {
    r.push(block(i));
  }
  return r;
} 
// End Utils

function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce((max, cell) => Math.max(max, cell.minHeight()), 0);
  });
}

/*
  return the array of maximum widths of each column
*/
function colWidths(rows) {
  return rows[0].map(function(_, i) {
    return rows.reduce((max, row) => Math.max(max, row[i].minWidth()), 0);
  });
}
    
function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function(row) {
    return keys.map(function(name) {
      // return new TextCell(String(row[name]));
      var value = row[name];
      //  if (typeof value == "number")
      if (/^\s*[-+]?\d+([.]\d*)?([eE][-+]?\d+)?\s*$/.test(value))
        return new RTextCell(String(value));
      else
        return new TextCell(String(value));
    });
  });
  return [headers].concat(body);
}

function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }

  function drawRow(row, rowNum) {
    var blocks = row.map((cell, colNum) => cell.draw(widths[colNum], heights[rowNum]));
    return blocks[0].map((_, lineNo) => drawLine(blocks, lineNo)).join("\n");
  }

  return rows.map(drawRow).join("\n");
}    
    
function drawIt(data) {
  return drawTable(dataTable(data));
}

module.exports = {
  drawIt: drawIt,
  drawTable: drawTable,
};

    
   
