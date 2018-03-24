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
- `.js|.jsx|.ts|.tsx` files
- displays lines of code count and different js content stats

### Coming soon
- add more stats to display (feedback welcome)
- support React (Component stats, redux|mobx|vue)
- support CSS
- add tests
