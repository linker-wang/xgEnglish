// component/register-form/index.js
import { register } from '../../service/modules/api_register'
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
    email: "",
    password: "",
    userName: "",
    ensurePassword: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputUserName: function() {

    },
    inputPassword: function() {

    },
    inputEnsurePassword: function() {

    },
    inputEmail: function() {

    },
    toRegister: function() {
      const userName = this.data.userName
      const password = this.data.password
      const ensurePassword = this.data.ensurePassword
      const email = this.data.email
      // 确保用户名大于6位，小于20位
      if (userName.length < 6 || userName.length > 20) {
        console.log("用户名应大于6位，小于12位")
        return
      }
      // 确保密码相同
      if (password !== ensurePassword) {
        console.log("输入的密码不相同")
        return
      }
      // 确保密码大于6位，小于12位
      if (password.length < 6 || password.length > 20) {
        console.log("密码应大于6位，小于20位")
        return
      }
      const info = {
        userName,
        password,
        email
      }
      register(info)
    },
    returnLogin: function() {
      this.triggerEvent("returnLogin")
    }
  }
})
