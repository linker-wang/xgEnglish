// pages/classic-books/index.js
import { getClassicList } from "../../service/modules/api_classic"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicBookList: [],
    titleArr: ["我的书库", "全部书籍"],
    myLibrary: [],
  },

  toReading(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../reading/index?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    const res = await getClassicList()
    this.setData({
      classicBookList: res
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