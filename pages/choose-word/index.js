// pages/choose-word/index.js
import {
  postChooseWordOptions
} from '../../service/modules/api_func'
import {
  disruptOrder,
  randomletterNum
} from '../../utils/js/tools'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: {},
    wordInfo: {},
    startIndex: 0,
    finishCount: 0,
    options: [],
    firstClick: true,
    flagMistake: -1,
    flagCorrect: -1,
    rightCount: 0,
    mistakeStyle: "background-color: #f7c1be; color: black;",
    correctStyle: "background-color: #7df5b7; color: black;"
  },

  clickItem(event) {
    const isRight = event.currentTarget.dataset.isright
    const index = event.currentTarget.dataset.index
    if (isRight) {
      this.setData({
        flagCorrect: index,
        flagMistake: -1,
        rightCount: this.data.rightCount + (this.data.firstClick ? 1 : 0)
      })
      this.setWord(this.data.bookInfo)
    } else {
      this.setData({
        flagCorrect: -1,
        flagMistake: index,
        firstClick: false
      })
    }
  },

  async setWord(bookInfo) {
    if (this.data.finishCount >= bookInfo.planCount) {
      const score = this.data.rightCount / bookInfo.planCount * 100
      wx.redirectTo({
        url: `../result-page/index?score=${score}`,
      })
      return
    }
    // 请求单词信息
    const bookName = bookInfo.bookName
    const opsIndex = randomletterNum(bookInfo.wordCount, 3)
    const startIndex = this.data.startIndex
    const res = await postChooseWordOptions(bookName, startIndex, opsIndex)
    const ops = disruptOrder(res.options)
    this.setData({
      options: ops,
      wordInfo: res.wordInfo,
      startIndex: startIndex + 1,
      flagMistake: -1,
      flagCorrect: -1,
      finishCount: this.data.finishCount + 1,
      firstClick: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const bookInfo = JSON.parse(options.bookInfo).currentBook
    const startIndex = bookInfo.finishCount - bookInfo.haveLearnCount
    this.setData({
      bookInfo,
      startIndex,
      finishCount: 0
    })

    this.setWord(bookInfo)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})