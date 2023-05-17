import myRequest from '../index'
import { BASE_URL } from '../config'

export function postWordBook(currentBook) {
  const url = BASE_URL + "/curentWordBook"
  const username = wx.getStorageSync('username')
  return myRequest.put(url, {
    username,
    currentBook
  })
}