// component/bottom-botton/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: "default"
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
    addWordBook() {
      this.triggerEvent("addWordBook")
    },
    startTouch() {
      this.triggerEvent("startTouch")
    },
    endTouch() {
      this.triggerEvent("endTouch")
    }
  }
})
