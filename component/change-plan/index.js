// component/change-plan/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    wordBook: {
      type: Object,
      value: {
        bookName: "--",
        wordCount: 0
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    columns: [],
    finishDayCount: 0
  },

  lifetimes: {
    ready: function () {
      const wordBook = this.data.wordBook
      // 计划
      const wordCount = wordBook.wordCount
      const planCount = this.getPlanCount(wordCount)
      const dayCount = this.getDayCount(wordCount, planCount)
      this.setData({
        columns: [{
            values: planCount,
            className: 'column1',
          },
          {
            values: dayCount,
            className: 'column2'
          }
        ],
        finishDayCount: dayCount[0]
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange: function (event) {
      const { picker, value, index } = event.detail
      const wordCount = this.data.wordBook.wordCount
      if (index === 0) {
        const arr = this.data.columns[1].values
        const columnIndex = arr.indexOf(Math.ceil(wordCount / value[0]))
        picker.setColumnIndex(1, columnIndex)
        this.setData({
          finishDayCount: arr[columnIndex]
        })
        this.triggerEvent("changePicker", value[0])
      }
      if (index === 1) {
        const arr = this.data.columns[0].values
        const columnValue = wordCount / value[1]
        let changeValue = 5
        for (let index in arr) {
          const item = arr[index]
          if (columnValue <= item) {
            changeValue = item
            picker.setColumnValue(0, item)
            break
          }
        }
        this.setData({
          finishDayCount: value[1]
        })
        this.triggerEvent("changePicker", changeValue)
      }
    },

    // 获取计划每日单词个数
    getPlanCount: function (count) {
      const arr = []
      for (let index = 1; index <= count; index++) {
        if (index <= 100) {
          if (index % 5 === 0) {
            arr.push(index)
          }
        } else if (index <= 400) {
          if (index % 25 === 0) {
            arr.push(index)
          }
        } else if (index <= 1000) {
          if (index % 50 === 0) {
            arr.push(index)
          }
        } else {
          break
        }
      }
      return arr
    },

    // 获取计划天数
    getDayCount: function (wordCount, planCount) {
      const arr = []
      planCount.forEach(count => {
        arr.push(Math.ceil(wordCount / count))
      })
      return Array.from(new Set(arr))
    },
  }
})