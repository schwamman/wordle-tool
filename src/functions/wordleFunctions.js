'use-strict';
const fs = require('fs');
const wordListPath = require('word-list');

const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
/**
 * Returns all words that include the provided letters
 * @param {Array} includedLetters An array of letters that must be in the word
 * @param {Array} excludedLetters An array of letters that cannot be in the word
 */
function getWordsIncluding(includedLetters, excludedLetters = [], letterOrder = [], wordLength = 5) {
  const wordleArray = wordArray.filter(word => !wordLength || word.length === wordLength);
  const wordList = new Set();

  includedLetters.forEach((letter, i) => {
    if (!isLetter(letter)) {
      throw new Error('Invalid Character Used: Must Only Contain Valid Letters');
    }
    includedLetters[i] = letter.toLowerCase();
  });

  excludedLetters.forEach((letter, i) => {
    if (!isLetter(letter)) {
      throw new Error('Invalid Character Used: Must Only Contain Valid Letters');
    }
    excludedLetters[i] = letter.toLowerCase();
  });

  if (wordLength && letterOrder.length > wordLength) {
    throw new Error(`The desired word length (${wordLength}) is less than the provided letterOrder length (${letterOrder.length}).`);
  }

  letterOrder.forEach((letter, i) => {
    if (letter !== null && !isLetter(letter)) {
      throw new Error('Invalid Character Used: Must Only Contain Valid Letters');
    }
    letterOrder[i] = letter ? letter.toLowerCase() : null;
  });
  console.log(letterOrder);

  wordleArray.forEach(word => {
    let containsIncluded = true;
    let containsExcluded = false;
    let inOrder = true;
    includedLetters.forEach(letter => {
      if (!word.includes(letter)) containsIncluded = false;
    });
    excludedLetters.forEach(letter => {
      if (word.includes(letter)) containsExcluded = true;
    });
    [...word].forEach((letter, i) => {
      if (letterOrder[i] && letter !== letterOrder[i]) {
        inOrder = false;
      }
    });
    if (containsIncluded && !containsExcluded && inOrder) wordList.add(word);
  });
  return Array.from(wordList);
}

/**
 * Checks if Character is a Valid Letter
 * @param {String} char A single string charactor
 */
function isLetter(char) { 
  return char.toUpperCase() != char.toLowerCase() || char.codePointAt(0) > 127;
}


module.exports = exports = { getWordsIncluding, isLetter };