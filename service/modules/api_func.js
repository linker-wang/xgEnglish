import myRequest from '../index'
import { BASE_URL } from '../config'

export function postChooseMeaningOptions(wordBookName, wordIndex, opsIndex) {
  const url = BASE_URL + "/exam/ChooseMeaning"
  return myRequest.get(url, {
    wordBookName,
    wordIndex,
    opsIndex
  })
}

export function postChooseWordOptions(wordBookName, wordIndex, opsIndex) {
  const url = BASE_URL + "/exam/ChooseWord"
  return myRequest.get(url, {
    wordBookName,
    wordIndex,
    opsIndex
  })
}

