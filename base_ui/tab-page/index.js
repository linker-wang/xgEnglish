// base_ui/tab-page/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    titleArr: {
      type: Array,
      value: []
    },
    activeColor: {
      type: String,
      value: "#4091d2"
    },
    borderWeight: {
      type: String,
      value: "3"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0,
    currentIndex: 0
  },

  lifetimes: {
    ready() {
      wx.getSystemInfoAsync({
        success: res => {
          this.setData({
            statusBarHeight: res.statusBarHeight
          })
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack: function() {
      wx.navigateBack()
    },
    changeCurrentIndex: function(event) {
      const index = event.target.dataset.index
      this.setData({
        currentIndex: index
      })
    },
    sliding: function(event) {
      const index = event.detail.current
      this.setData({
        currentIndex: index
      })
    }
  }
})
