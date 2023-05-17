// component/module-area/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookInfo: {
      type: Object,
      value: {}
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
    toSelectWordBook() {
      const bookInfo = JSON.stringify(this.data.bookInfo)
      wx.navigateTo({
        url: `/pages/select-word-book/index?bookInfo=${bookInfo}`,
      })
    },
    toChooseMeaning() {
      const bookInfo = JSON.stringify(this.data.bookInfo)
      wx.navigateTo({
        url: `../../pages/choose-meaning/index?bookInfo=${bookInfo}`
      })
    },
    toChooseWord() {
      const bookInfo = JSON.stringify(this.data.bookInfo)
      wx.navigateTo({
        url: `../../pages/choose-word/index?bookInfo=${bookInfo}`
      })
    },
    toSpokenTest() {
      const bookInfo = JSON.stringify(this.data.bookInfo)
      wx.navigateTo({
        url: `../../pages/spoken-test/index?bookInfo=${bookInfo}`
      })
    },
    toReadBook() {
      wx.navigateTo({
        url: `../../pages/classic-books/index`,
      })
    }
  }
})
