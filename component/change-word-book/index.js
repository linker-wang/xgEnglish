// component/change-word-book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    wordBookArr: {
      type: Array,
      value: []
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
    addWordBook: function() {
      wx.navigateTo({
        url: '../../pages/show-word-book/index',
      })
    }
  }
})
