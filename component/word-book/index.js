// component/select-word-book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookInfo: {
      type: Object,
      value: {
        bookName: "--",
        wordCount: 0,
        planCount: 0,
        finishCount: 0
      }
    },
    status: {
      type: String,
      value: ""
    },
    statusStyle: {
      type: String,
      value: ""
    },
  },

  lifetimes: {
    ready: function() {
      const bookInfo = this.data.bookInfo
      const wordCount = bookInfo.wordCount
      const finishCount = bookInfo.finishCount
      const planCount = bookInfo.planCount
      this.setData({
        remainingDay: Math.ceil((wordCount - finishCount) / planCount)
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    remainingDay: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
