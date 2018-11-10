const config = require('./config')
const fs = require('fs')

/**
 * Process anagrams
 * @param {string} testWord
 */
exports.processAnagrams = (testWord, textLines) => {
  testWord = testWord.replace(config.specialCharsRegex, '')
  if (!testWord) {
    return
  } else {
    return this.findAnagrams(testWord, textLines)
  }
}

/**
 * Find anagrams
 * @param {string} testWord
 * @returns {array}
 */
exports.findAnagrams = (testWord, textLines) => {
  testWord.toLowerCase()
  testWord = testWord.trim().replace(' ', '')
  testWord = testWord.replace(config.specialCharsRegex, '')
  
  let possibleAnagrams = textLines.filter(word => word.length == testWord.length)
  let testAnagrams = this.anagrams(possibleAnagrams)
  
  // try to find anagram by inserted word
  let anagramsFound
  for (var k in testAnagrams) {
    let results = testAnagrams[k].includes(testWord)
    if (results) {
      anagramsFound = testAnagrams[k]
    }
  }

  return anagramsFound
}

/**
 * Generate anagrams
 * @param {array} words
 */
exports.anagrams = (words) => {
  const anagrams = {}
  words.forEach((word)=>{
    const sortedWord = this.mixWord(word)
    sortedWord.toLowerCase()
    if (anagrams[sortedWord]) {
      return anagrams[sortedWord].push(word)
    }
    anagrams[sortedWord] = [word]
  })
  return anagrams
}

/**
 * Mix word
 * @param {string} word
 * @returns {string}
 */
exports.mixWord = (word) => {
  if (!word) { return }
  word = word.replace(/[^a-zA-Z0-9-. ]/g, '')
  word.toLowerCase()

  word = word.split('')
  word = word.sort()
  word = word.join('')

  return word
}

/**
 * Get texts from file
 * @param {string} file
 */
exports.getTextFromFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, textLines) => {
      if (err) {
        reject(err)
      } else {
        textLines = textLines.toString().split(config.splitStringRegex)     
        resolve(textLines)
      }
    })
  })
}
