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

let allFilesCount = 0;
let allJavaScriptFilesCount = 0;
let allOtherFilesCount = 0;
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
  allFilesCount++;
  
  let matchAllJavaScriptFiles = file.match(/\.js$|\.jsx$|\.ts$|\.tsx$/);
  let matchJsFiles = file.match(/\.js$/);
  let matchJsxFiles = file.match(/\.jsx$/);
  let matchTsFiles = file.match(/\.ts$/);
  let matchTsxFiles = file.match(/\.tsx$/);

  let fileContent = fs.readFileSync(file).toString();
  // Display progress while going through files
  rl.write('.');

  totalLines += fileContent.split('\n').length;
  
  // Match javascript files
  if (matchAllJavaScriptFiles) {
    allJavaScriptFilesCount++;

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
  }  
});

totalOtherLines = totalLines - totalJavaScriptLines;
allOtherFilesCount = allFilesCount - allJavaScriptFilesCount;

let totalJsLinesPercentage = `(${Math.round(totalJavaScriptLines/totalLines * 100)}%)`;
let totalOtherLinesPercentage = `(${Math.round(totalOtherLines/totalLines * 100)}%)`;
let totalJsFilesPercentage = `(${Math.round(allJavaScriptFilesCount/allFilesCount * 100)}%)`;
let totalOtherFilesPercentage = `(${Math.round(allOtherFilesCount/allFilesCount * 100)}%)`;

rl.write("\n\n   Stats");
rl.write("\n________________________________________________________________");
rl.write(`\n   LOC                                                          `);
rl.write(`\n   Total: ${totalLines}   |   JavaScript: ${totalJavaScriptLines} ${totalJsLinesPercentage}   |   Other: ${totalOtherLines} ${totalOtherLinesPercentage}   `);
rl.write("\n________________________________________________________________");
rl.write(`\n   FILES                                                        `);
rl.write(`\n   Total: ${allFilesCount}   |   JavaScript: ${allJavaScriptFilesCount} ${totalJsFilesPercentage}   |   Other: ${allOtherFilesCount} ${totalOtherFilesPercentage}   `);
rl.write(`\n                                                                `);
rl.write(`\n   JAVASCRIPT FILES                                             `);
rl.write(`\n   js: ${jsFilesCount}   |   jsx: ${jsxFilesCount}   |   ts: ${tsFilesCount}   |   tsx: ${tsxFilesCount}   `);
rl.write("\n________________________________________________________________");
rl.write(`\n   CONTENT                                                      `);
rl.write(`\n   vars: ${totalVariables}   |   lets: ${totalLets}   |   consts: ${totalConsts}   | if statements: ${totalIfs}`);
rl.write(`\n   functions: ${totalFunctions}   | comments:  ${totalComments}`);
rl.write("\n________________________________________________________________");
rl.write("\n");
rl.close();
