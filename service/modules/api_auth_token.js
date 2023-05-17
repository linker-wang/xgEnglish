import myRequest from '../index'
import { BASE_URL } from '../config'

// 验证token
export function checkToken() {
  const url = BASE_URL + "/token"
  const token = wx.getStorageSync('token')
  return myRequest.get(url, {}, true, { token: token })
}