// component/user-info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    size: {
      type: Number,
      value: 60
    },
    username: {
      type: String,
      value: "--"
    },
    nickname: {
      type: String,
      value: "- -"
    },
    headerIcon: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toShow() {
      this.setData({
        show: true
      })
      console.log(1)
    }
  }
})
