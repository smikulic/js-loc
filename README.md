# Description
Simple LOC stats for JS oriented projects.

# Install
`npm install js-loc --save-dev`

or

`yarn add js-loc --dev`

# Usage
To check all your folder structure files
run `./node_modules/.bin/jsloc` in your terminal
or add `./node_modules/.bin/jsloc` as a script in your project's `package.json` file.

### like this:
```javascript
"scripts": {
  "jsloc": "./node_modules/.bin/jsloc"
}
```

and then run in your terminal:
`npm run jsloc`

or

`yarn jsloc`


## #Current state
- all nested files and folders
- only `.js` files
- displays only lines of code and variable count values

### Coming soon
- add more stats to display (feedback welcome)
- support React and Typescript (check `.jsx|.tsx|.ts` files)
- add tests
