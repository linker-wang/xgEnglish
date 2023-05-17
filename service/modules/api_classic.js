import myRequest from '../index'
import { BASE_URL } from '../config'

export function getClassicList() {
  const url = BASE_URL + "/classicBook"
  return myRequest.get(url)
}

export function addClassicToLib(id, index) {
  const url = BASE_URL + "/classicBook"
  const username = wx.getStorageSync('username')
  return myRequest.post(url, {id, index, username})
}

export function getContentByIndex(id, index) {
  const url = BASE_URL + "/classicBook/chapter"
  return myRequest.get(url, {id, index})
}