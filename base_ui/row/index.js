// base_ui/row/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    leftText: {
      type: String,
      value: "--"
    },
    middleText: {
      type: String,
      value: ""
    },
    rightText: {
      type: String,
      value: "--"
    },
    rowHeight: {
      type: Number,
      value: 60
    },
    bottonBorder: {
      type: Boolean,
      value: true
    },
    leftTextColor: {
      type: String,
      value: ''
    },
    leftWidth: {
      type: String,
      value: ''
    },
    middleTextColor: {
      type: String,
      value: ''
    },
    rightTextColor: {
      type: String,
      value: ''
    },
    bgc: {
      type: String,
      value: ''
    },
    borderRadius: {
      type: String,
      value: ''
    },
    marginBottom: {
      type: String,
      value: ''
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

  }
})
