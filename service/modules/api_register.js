import myRequest from '../index'
import { BASE_URL } from '../config'

// 注册
export function register(info) {
  const url = BASE_URL + "/user"
  return myRequest.post(url, info)
}