const express = require('express');
const router = express.Router();
const { wrap, get401, send } = require('../route-helpers');
const { getWordsIncluding, isLetter } = require('../functions/wordleFunctions');

router.get('/getSuggestions/:includedLetters', wrap(getSuggestions));
router.get('/getSuggestions/:includedLetters/:excludedLetters', wrap(getSuggestions));
router.get('/getSuggestions/:includedLetters/:excludedLetters/:letterOrder', wrap(getSuggestions));
router.post('/getSuggestions', wrap(getSuggestions));

function getSuggestions(req, res) {
  const includedLetters = req.params.includedLetters ? req.params.includedLetters.split('') : (req.body.includedLetters || []);
  const excludedLetters = req.params.excludedLetters ? req.params.excludedLetters.split('') :(req.body.excludedLetters || []);
  const letterOrder = req.params.letterOrder ? parseLetterOrder(req.params.letterOrder) : req.body.letterOrder;
  console.log(includedLetters, excludedLetters, letterOrder);
  if (!includedLetters.length) {
    throw new Error('At least 1 letters must be provided to get suggesstions');
  }

  const words = getWordsIncluding(includedLetters, excludedLetters, letterOrder);
  console.log(words);
  send(words, res);
}


/**
 * Converts letterOrder paramater string into an array. Any non-letter characters (e.g. '_' or '?') will be converted to null value.
 * @param {String} letterOrderStr letterOrder paramater string 
 */
function parseLetterOrder(letterOrderStr) {
  const orderArray = letterOrderStr.split('');
  orderArray.forEach((letter, i) => {
    if (!isLetter(letter)) {
      orderArray[i] = null;
    }
  });
  return orderArray;
}


module.exports = router;
