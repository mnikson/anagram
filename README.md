# Anagrams

This is the Node.js application for finding all anagrams of a given word in a
dictionary inserted by user.

## Requirements

* Node (>= v.10.0.0)
* npm v6.0

## Installation

Use `npm` package manager to install project.

```bash
npm install
```

## Start

To start application run command:

```bash
npm start
```
When application is started, question for user to input word to be matched should be shown.

```bash
please wait...
Insert word for anagram>
```

## Project structure

### Configuration

Configuration file is located at `src` directory, in `src/config.js` file. Configuration file should look like:

```JavaScript
exports.filename = './data/wordlist.txt' // path to text file which contain words library
exports.splitStringRegex = /\r?\n/ // regex rule for splitting the words from text file (default: new line)
exports.specialCharsRegex = /[^a-zA-Z0-9-. ]/g // regex rule for special characters to be removed from user's input
exports.promptQuestion = 'Insert word for anagram: ' // question for user's input in command line
```

### Dictionary file

The file with words dictionary is located into `data` The directory, file is named `wordlist.txt`.

## Code Standards

https://eslint.org/

### Rules

* 2 spaces – for indentation
* Single quotes for strings – except to avoid escaping
* No unused variables – this one catches tons of bugs!
* No semicolons – It's fine. Really!
* Never start a line with (, [, or `
* Space after keywords if (condition) { ... }
* Space after function name function name (arg) { ... }
* Always use === instead of == – but obj == null is allowed to check null || undefined.
* Always handle the node.js err function parameter
* Always prefix browser globals with window – except document and navigator are okay
* Prevents accidental use of poorly-named browser globals like open, length, event, and name.
* Use ES2018 standards. 

To check your code use command `npm run eslint`.

## Testing
Test are located in `test` directory. As testing framework is used [Mocha](https://mochajs.org/). To run tests use command:

```bash
npm test
```

Please make sure to update tests as appropriate.

