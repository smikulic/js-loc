#!/usr/bin/env node
let fs = require("fs");
let readline = require('readline');
let path = require("path");
let normalizedPath = path.join(process.cwd(), "/");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Stats result
let totalLines = 0;
let totalVariables = 0;
let allFiles = [];

// Start
rl.write('Counting.');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    
    // TODO: add blacklisting instead just git folder
    if (file !== '.git') {
      filelist = fs.statSync(path.join(dir, file)).isDirectory()
        ? walkSync(path.join(dir, file), filelist)
        : filelist.concat(path.join(dir, file));  
    }

  });

return filelist;
}

// Loop through all nested folders and gather files
allFiles = walkSync(normalizedPath);

// Loop through all valid files to get the count
allFiles.forEach(function(file) {
  // Match only javascript files
  if (file.match(/\.js$/)) {
    let fileContent = fs.readFileSync(file).toString();
    // Display progress while going through files
    rl.write('.');
    // Match variables
    totalVariables += fileContent.match(/var /g) ?
      fileContent.match(/var /g).length : 0;
    // Match end of line
    totalLines += fileContent.split('\n').length;
  }
});

rl.write("\n\nStats");
rl.write("\n_____________________________________________");
rl.write(`\nTotal LOC:         | ${totalLines}`);
rl.write(`\nTotal variables:   | ${totalVariables}`);
rl.write("\n_____________________________________________");
rl.write("\n");
rl.close();