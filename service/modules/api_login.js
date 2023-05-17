import myRequest from '../index'
import { BASE_URL } from '../config'

// 请求用户code函数
export function getLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 2000,
      success: (res) => {
        resolve(res.code)
      },
      fail: (err) => {
        reject(err.errMsg)
      }
    })
  })
}

// 向第三方服务器发送code
export function sendCodeToServer(code) {
  const url = BASE_URL + "/login"
  return myRequest.post(url, {code: code})
}

// 登录
export function login(info) {
  const url = BASE_URL + "/token"
  return myRequest.post(url, info)
}