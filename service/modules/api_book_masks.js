
import myRequest from '../index'
import { BASE_URL } from '../config'

export function saveBookMasks(id, bookMasks) {
  const url = BASE_URL + "/user/bookMasks"
  const username = wx.getStorageSync('username')
  return myRequest.post(url, {
    id,
    username,
    bookMasks
  })
}