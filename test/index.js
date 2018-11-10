const f = require('../src/functions')
const should = require('should')
const assert = require('assert')

describe('test functions', () => {

  describe('tests for text file', () => {
    it('should not find file', async () => {
      try {
        const textLines = await f.getTextFromFile(`./no_wordtest.txt`)
      } catch (err) {
        assert.strictEqual(err.message, `ENOENT: no such file or directory, open './no_wordtest.txt'`)
        should.exist(err)
      }
    })
  
    it('should return text lines', async () => {
      try {
        const textLines = await f.getTextFromFile(`${__dirname}/wordtest.txt`)
        
        should(textLines).be.type('object')
        should(textLines).not.be.empty
        should(textLines).containDeep([ 'abc', 'cab', 'acb', 'bac', '123', '321', '#)sdk', '^^771' ])
      } catch (err) {
        should.not.exist(err)
      }
    })
  })
  
  describe('tests for mix word', () => {
    it('should return null, word is not provided', (done) => {
      const word = f.mixWord()
      
      should(word).be.undefined()
      done()
    })

    it('should return word', (done) => {
      const word = f.mixWord('abc')
      
      should(word).not.be.undefined()
      should(word).not.be.empty()
      word.should.be.type('string')
      assert.strictEqual(word, 'abc')
      done()
    })

    it('should return word, with special characters', (done) => {
      const word = f.mixWord(')abc')
      
      should(word).not.be.undefined()
      should(word).not.be.empty()
      word.should.be.type('string')
      assert.strictEqual(word, 'abc')
      done()
    })
  })

  describe('tests for anagrams', () => {
    const test = ['abd', '123', 'qwerty']

    it('should not return words', (done) => {
      const words = f.anagrams([])
      
      should(words).be.empty()
      words.should.be.type('object')
      done()
    })

    it('should return words', (done) => {
      const words = f.anagrams(test)

      should(words).not.be.empty()
      words.should.be.type('object')
      words.should.have.property('123')
      words.should.have.property('abd')
      assert.deepEqual(words, { '123': [ '123' ], abd: [ 'abd' ], eqrtwy: [ 'qwerty' ] })
      done()
    })
  })

  describe('tests for find anagrams', () => {
    const textLines = ['abd', '123', 'qwerty']

    it('should not find anagrams', (done) => {
      const anagrams = f.findAnagrams('abc', textLines)

      should(anagrams).be.undefined()
      done()
    })

    it('should find anagrams', (done) => {
      const anagrams = f.findAnagrams('abd', textLines)
      
      should(anagrams).not.be.undefined()
      assert.deepEqual(anagrams, ['abd'])
      done()
    })

    it('should find anagrams, empty space in string', (done) => {
      const anagrams = f.findAnagrams('ab d', textLines)
      
      should(anagrams).not.be.undefined()
      assert.deepEqual(anagrams, ['abd'])
      done()
    })

    it('should find anagrams, special characters in string', (done) => {
      const anagrams = f.findAnagrams('ab%d', textLines)
      
      should(anagrams).not.be.undefined()
      assert.deepEqual(anagrams, ['abd'])
      done()
    })

  })

  describe('tests for process anagrams', () => {
    const textLines = ['abd', 'dba', 'adb', 'dab', '123', '321', '122', 'qwerty']

    it('should not find anagrams', (done) => {
      const anagrams = f.processAnagrams('abc', textLines)
      
      should(anagrams).be.undefined()
      done()
    })

    it('should find anagrams', (done) => {
      const anagrams = f.processAnagrams('abd', textLines)
      
      should(anagrams).not.be.undefined()
      assert.deepEqual(anagrams, [ 'abd', 'dba', 'adb', 'dab' ])
      done()
    })

    it('should find anagrams', (done) => {
      const anagrams = f.processAnagrams('123', textLines)
      
      should(anagrams).not.be.undefined()
      assert.deepEqual(anagrams, [ '123', '321' ])
      done()
    })
  })

})