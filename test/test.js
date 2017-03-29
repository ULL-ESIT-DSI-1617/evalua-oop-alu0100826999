var dt = require("../lyingoutatable.js");
var drawIt = dt.drawIt;
var drawTable = dt.drawTable;
var dataTable = dt.dataTable;

var TextCell_ = require ('../TextCell.js')
var TextCell = TextCell_.TextCell

var UnderlinedCell_ = require('../UnderlinedCell.js')
var UnderlinedCell = UnderlinedCell_.UnderlinedCell

var RTextCell_ = require('../RTextCell.js')
var RTextCell = RTextCell_.RTextCell


var MOUNTAINS = [
  {name: "Kilimanjaro\nMontaña mágica", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal\nPaís lejano"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

var expected = 
`name           height country      
-------------- ------ -------------
Kilimanjaro      5895 Tanzania     
Montaña mágica                     
Everest          8848 Nepal        
                      País lejano  
Mount Fuji       3776 Japan        
Mont Blanc       4808 Italy/France 
Vaalserberg       323 Netherlands  
Denali           6168 United States
Popocatepetl     5465 Mexico       `;

//var col1w = 14, col2w = 6, col3w = 11;
describe("drawIt", function() {
  it("must draw the mountains table correctly", function() {
    var result = drawIt(MOUNTAINS);
    /* There is a white space between consecutive columns */
    result.should.match(/^(.{14}\s.{6}\s.{13}\s*){11}$/);
    result.should.match(/Montaña mágica\s{20}/);
  })
});



function checkerboard() {
  var rows = [];
  for (var i = 0; i < 5; i++) {
     var row = [];
     for (var j = 0; j < 5; j++) {
       row.push(new TextCell(((j+i)%2)? " " : "##"));
     }
     rows.push(row);
  }
  return rows;
}

var expectedCheckerboard = 
`##    ##    ##
   ##    ##   
##    ##    ##
   ##    ##   
##    ##    ##`;
describe("drawTable", function() {
  it("must draw the checkerboard correctly", function() {
    drawTable(checkerboard()).should.match(/^(([# ]{2}(\s|$)){5}){5}$/);
  })
});
