import myRequest from '../index'
import { BASE_URL } from '../config'

export function getWordBookList() {
  const url = BASE_URL + "/wordBook"
  return myRequest.get(url)
}

export function getWordInfo(wordBookName, wordIndex) {
  const url = BASE_URL + "/wordBook/wordInfo"
  return myRequest.get(url, {
    wordBookName,
    wordIndex
  })
}

export function getNextWord(wordBookName, wordIndex) {
  const url = BASE_URL + "/curentWordBook"
  const username = wx.getStorageSync('username')
  return myRequest.patch(url, {
    username,
    wordBookName,
    wordIndex
  })
}