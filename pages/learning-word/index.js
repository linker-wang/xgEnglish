// pages/learning-word/index.js
import { getWordInfo, getNextWord } from '../../service/modules/api_word_book_list'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: {},
    wordInfo: {}
  },

  nextWord: async function() {
    const bookInfo = this.data.bookInfo
    if (bookInfo.haveLearnCount >= bookInfo.planCount) {
      wx.navigateBack()
      wx.showToast({ title: '已完成今日计划', icon: 'succes', duration: 2000, mask:true })
      return
    }
    bookInfo.haveLearnCount++
    const res = await getNextWord(bookInfo.bookName, ++bookInfo.finishCount)
    this.setData({
      wordInfo: res.wordInfo
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const bookInfo = JSON.parse(options.bookInfo)
    console.log(bookInfo)
    this.setData({
      bookInfo
    })
    // 请求单词信息
    const res = await getWordInfo(bookInfo.bookName, bookInfo.finishCount)
    console.log(res)
    this.setData({
      wordInfo: res.wordInfo
    })
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