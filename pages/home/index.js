// pages/home/index.js
import {
  checkToken
} from '../../service/modules/api_auth_token'
import {
  getWordBookInfo
} from '../../service/modules/api_word_book_info'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: null,
    needToday: 0
  },

  // 跳转到搜索页面
  toSearchPage: function () {
    wx.navigateTo({
      url: '../search-page/index',
    })
  },

  //跳转到背诵单词页
  learnWord: function () {
    if (this.data.bookInfo && this.data.bookInfo.currentBook) {
      const bookInfo = JSON.stringify(this.data.bookInfo.currentBook)
      wx.navigateTo({
        url: `../../pages/learning-word/index?bookInfo=${bookInfo}`,
      })
    } else {
      wx.showToast({ title: '请选择词书', icon: 'none', duration: 1000, mask:true })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 查看token
    const token = wx.getStorageSync('token')
    if (!token) {
      // 登录页
      wx.reLaunch({
        url: '/pages/login/index',
      })
    } else {
      // 验证是否有效
      const tokenRes = await checkToken()
      console.log(tokenRes)
      if (tokenRes.status !== 200) {
        wx.reLaunch({
          url: '/pages/login/index',
        })
      }
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
  async onShow() {
    // 请求学习的词书信息
    const wordBookInfo = await getWordBookInfo()
    console.log(wordBookInfo)
    this.setData({
      bookInfo: wordBookInfo.bookInfo,
    })
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