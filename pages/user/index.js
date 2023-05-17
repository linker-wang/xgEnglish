// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "--",
    nickname: "- -",
    headerIcon: ""
  },

  toSetting: function() {
    wx.navigateTo({
      url: '../setting/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const username = wx.getStorageSync('username')
    const nickname = wx.getStorageSync('nickname')
    const headerIcon = "https://tosimplewzx.online:3001/asset/header/" + username
    this.setData({
      username,
      nickname,
      headerIcon
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