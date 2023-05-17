// component/word-book-cover/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    wordBook: {
      type: Object,
      value: {
        bookName: "--",
        wordCount: "--"
      }
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
    clickIt: function() {
      this.triggerEvent("clickIt")
    }
  }
})
