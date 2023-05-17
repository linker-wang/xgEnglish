// pages/show-word-book/index.js
import { getWordBookList } from '../../service/modules/api_word_book_list'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordBookList: []
  },

  selectBook: function(event) {
    const wordBook = JSON.stringify(event.currentTarget.dataset.book)
    wx.navigateTo({
      url: `../../pages/determine-plan-page/index?wordBook=${wordBook}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const res = await getWordBookList()
    if (res.wordBookList) {
      this.setData({
        wordBookList: res.wordBookList
      })
    }
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