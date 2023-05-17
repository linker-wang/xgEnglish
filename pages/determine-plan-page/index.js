// pages/determine-plan-page/index.js
import { postWordBook } from '../../service/modules/api_add_word_book'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordBook: {
      bookName: "--",
      wordCount: 0
    },
    planCount: 5
  },

  changePlanCount: function(event) {
    this.setData({
      planCount: event.detail
    })
  },

  addWordBook: async function() {
    await postWordBook({
      bookName: this.data.wordBook.bookName,
      wordCount: this.data.wordBook.wordCount,
      planCount: this.data.planCount,
      finishCount: 0,
      haveLearnCount: 0,
      needReview: 0,
    })
    wx.reLaunch({
      url: '../../pages/home/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const wordBook = JSON.parse(options.wordBook)
    this.setData({
      wordBook
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