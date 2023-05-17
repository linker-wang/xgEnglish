// pages/search-page/index.js
import {searchWords, iAssociate} from '../../service/modules/api_search_words'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWords: "",
    historyArr: [],
    iAssociate: [],
    isFoucus: false
  },
  // 改变input中的值时，修改keyWords
  changeKeyWords: function(event) {
    const keyWords = event.detail
    this.setData({keyWords})
    if (keyWords.length === 0) {
      this.setData({iAssociate: []})
      return 
    }
    this.search()
  },
  // 联想单词
  search: async function() {
    const keyWord = this.data.keyWords
    const res = await iAssociate(keyWord)
    // 保存搜索记录
    const entries = res.data.entries
    if (entries) {
      const iAssociate = []
      entries.forEach(element => {
        iAssociate.push({
          word: element.entry,
          meaning: element.explain
        })
      });
      this.setData({
        iAssociate
      })
    } else {
      this.setData({
        iAssociate: []
      })
    }
  },
  // 搜索框获取焦点
  toFocus: function() {
    this.setData({isFoucus: true})
  },
  // 搜索框失去焦点
  toBlur: function() {
    this.setData({isFoucus: false})
  },
  // 取消搜索
  cancelSearch: function() {
    wx.navigateBack()
  },
  // 选中单词
  toWord: function(event) {
    const word = event.currentTarget.dataset.word
    // 跳转到单词详情
    wx.navigateTo({
      url: `../word-detail/index?word=${word}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取Storage中的histotySearch
    const historySearch = wx.getStorageSync('histotySearch')
    if (historySearch) {
      const historyArr = JSON.parse(historySearch)
      this.setData({
        historyArr
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