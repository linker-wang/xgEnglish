// component/login-form/index.js
import { login } from '../../service/modules/api_login' 
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userName: "",
    password: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async toLogin() {
      const username = this.data.userName
      const password = this.data.password
      const info = {
        username,
        password
      }
      const res = await login(info)
      const token = res.token
      const nickname = res.nickname
      const headerIcon = res.headerIcon
      if (token) {
        // 保存数据
        wx.setStorageSync('token', token)
        wx.setStorageSync('nickname', nickname)
        wx.setStorageSync('headerIcon', JSON.stringify(headerIcon))
        wx.setStorageSync('username', username)
        // 跳转页面
        wx.reLaunch({
          url: '../../pages/home/index',
        })
      } else {
        console.log(res.error, res.errorCode)
      }
    },
    inputUserName: function() {
    },
    inputPassword: function() {
    },
    registerAccount: function() {
      this.triggerEvent("registerAccount")
    }
  }
})
