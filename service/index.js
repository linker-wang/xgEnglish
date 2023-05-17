class myRequest {
  constructor(token) {
    this.authHeader = { token }
  }

  request(url, method, params, isAuth = false, header = {}) {
    const finalHeader = isAuth ? { ...this.authHeader, ...header} : header
    return new Promise((resolve, reject) =>{
     wx.request({
       url: url,
       method: method,
       data: params,
       header: finalHeader,
       success: res => {
         resolve(res.data)
       },
       fail: reject
     })
   })
  }

  get(url, params, isAuth = false, header) {
    return this.request(url, "GET", params, isAuth, header)
  }

  post(url, params, isAuth = false, header) {
    return this.request(url, "POST", params, isAuth, header)
  }

  patch(url, params, isAuth = false, header) {
    return this.request(url, "PATCH", params, isAuth, header)
  }

  put(url, params, isAuth = false, header) {
    return this.request(url, "PUT", params, isAuth, header)
  }
}

export default new myRequest()