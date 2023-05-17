// component/query-words/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    enable:{
      type: Boolean,
      default: false
    },
    keyWords:{
      type: String,
      default: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearch(event) {
      this.triggerEvent("changeKeyWords",event.detail)
    },
    change() {
      this.triggerEvent("clickSearch")
    }
  }
})
