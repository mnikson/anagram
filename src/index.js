const readline = require('readline')
const config = require('./config')
const f = require('./functions')

/**
 * Run application
 */
const run = async () => {
  console.log('please wait...')
  try {
    // get lines from text file
    let textLines = await f.getTextFromFile(config.filename)

    // ask user for input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: config.promptQuestion
    })

    rl.prompt()
  
    rl.on('line', (testWord) => {
      console.time('found anagram in')

      if (testWord) {
        // try to find anagram for given word
        let anagramsFound = f.processAnagrams(testWord, textLines)
        
        if (anagramsFound) {
          console.log(`ANAGRAM FOUND FOR '${testWord}': ${anagramsFound}`)
        } else {
          console.log('ANAGRAM NOT FOUND')
        }
        console.timeEnd('found anagram in')
      }
      
      rl.prompt()
    })
      .on('close', () => {
        console.log('bye!')
        process.exit(0)
      })
  } catch (err) {
    // catch an error
    console.log(err)
  }
}

run()