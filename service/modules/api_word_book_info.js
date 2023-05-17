import myRequest from '../index'
import { BASE_URL } from '../config'

export function getWordBookInfo() {
  const url = BASE_URL + "/curentWordBook"
  const username = wx.getStorageSync('username')
  return myRequest.get(url, { username })
}