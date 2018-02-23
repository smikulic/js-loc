var fs = require("fs");
console.log("Start counting the lines...");

var totalLines = 0;
var totalVariables = 0;
fs.createReadStream("test.js").on("data", function(data) {
  var dataToString = data.toString();
  totalVariables = dataToString.match(/var /g).length;
  totalLines = dataToString.split('\n').length;
}).on("end", function() {
  console.log("Total number of lines in a file: ", totalLines);
  console.log("Total number of variables in a file: ", totalVariables);
});