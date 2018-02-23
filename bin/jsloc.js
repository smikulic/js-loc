#!/usr/bin/env node
var fs = require("fs");
var path = require("path");
var normalizedPath = path.join(__dirname, "/");

// Stats
var totalLines = 0;
var totalVariables = 0;

console.log("Start counting the lines...");

fs.readdirSync(normalizedPath).forEach(function(file) {

  // Match only javascript files
  if (file.match(/\.js$/)) {
    var fileContent = fs.readFileSync(file).toString();
    // Match variables
    totalVariables += fileContent.match(/var /g) ?
      fileContent.match(/var /g).length : 0;
    // Match end of line
    totalLines += fileContent.split('\n').length;
  }
});

console.log("Total number of lines: ", totalLines);
console.log("Total number of variables: ", totalVariables);