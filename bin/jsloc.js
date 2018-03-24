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
let allFiles = [];

let totalLines = 0;
let totalJavaScriptLines = 0;
let totalOtherLines = 0;

let totalVariables = 0;
let totalLets = 0;
let totalConsts = 0;
let totalIfs = 0;
let totalFunctions = 0;
let totalComments = 0;

let allJavaScriptFilesCount = 0;
let jsFilesCount = 0;
let jsxFilesCount = 0;
let tsFilesCount = 0;
let tsxFilesCount = 0;

// Start
rl.write('Counting.');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    
    // TODO: add blacklisting
    if (file !== '.git' && file !== 'node_modules') {
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
  let matchAllJavaScriptFiles = file.match(/\.js$|\.jsx$|\.ts$|\.tsx$/);
  let matchJsFiles = file.match(/\.js$/);
  let matchJsxFiles = file.match(/\.jsx$/);
  let matchTsFiles = file.match(/\.ts$/);
  let matchTsxFiles = file.match(/\.tsx$/);
  
  // Match javascript files
  if (matchAllJavaScriptFiles) {
    allJavaScriptFilesCount++;
    let fileContent = fs.readFileSync(file).toString();
    // Display progress while going through files
    rl.write('.');

    let matchVars = fileContent.match(/var /g);
    let matchLets = fileContent.match(/let /g);
    let matchConsts = fileContent.match(/const /g);
    let matchIfs = fileContent.match(/if \(/g);
    let matchFunctions = fileContent.match(/function \(/g);
    let matchComments = fileContent.match(/\/\/|\/\*/g);

    // Count js related files
    if (matchJsFiles) { jsFilesCount++; }
    if (matchJsxFiles) { jsxFilesCount++; }
    if (matchTsFiles) { tsFilesCount++; }
    if (matchTsxFiles) { tsxFilesCount++; }

    // Match file content
    totalVariables += matchVars ? matchVars.length : 0;
    totalLets += matchLets ? matchLets.length : 0;
    totalConsts += matchConsts ? matchConsts.length : 0;
    totalIfs += matchIfs ? matchIfs.length : 0;
    totalFunctions += matchFunctions ? matchFunctions.length : 0;
    totalComments += matchComments ? matchComments.length : 0;
    
      // Match end of line
    totalJavaScriptLines += fileContent.split('\n').length;
  // Match other files
  } else {
    let fileContent = fs.readFileSync(file).toString();
    // Display progress while going through files
    rl.write('.');
    
    // Match end of line
    totalOtherLines += fileContent.split('\n').length;
  }

  totalLines = totalJavaScriptLines + totalOtherLines;
});

rl.write("\n\nStats");
rl.write("\n_____________________________________________");
rl.write(`\nLOC                               `);
rl.write(`\nTotal LOC:                        | ${totalLines}`);
rl.write(`\njavaScript LOC:                   | ${totalJavaScriptLines}`);
rl.write(`\nOther LOC:                        | ${totalOtherLines}`);
rl.write("\n");
rl.write(`\nFiles count                       `);
rl.write(`\nTotal javaScript files:           | ${allJavaScriptFilesCount}`);
rl.write(`\n.js:                              | ${jsFilesCount}`);
rl.write(`\n.jsx:                             | ${jsxFilesCount}`);
rl.write(`\n.ts:                              | ${tsFilesCount}`);
rl.write(`\n.tsx:                             | ${tsxFilesCount}`);
rl.write("\n");
rl.write(`\nContent                           `);
rl.write(`\nvariables:                        | ${totalVariables}`);
rl.write(`\nlets:                             | ${totalLets}`);
rl.write(`\nconsts:                           | ${totalConsts}`);
rl.write(`\nif statements:                    | ${totalIfs}`);
rl.write(`\nfunctions:                        | ${totalFunctions}`);
rl.write(`\ncomments:                         | ${totalComments}`);
rl.write("\n_____________________________________________");
rl.write("\n");
rl.close();