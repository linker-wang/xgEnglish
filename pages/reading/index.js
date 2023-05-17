// pages/reading/index.js
import {
  addClassicToLib,
  getContentByIndex
} from '../../service/modules/api_classic'
import {
  saveBookMasks
} from '../../service/modules/api_book_masks'
import Toast from '@vant/weapp/toast/toast';
import { getScrollTop } from '../../utils/js/getScrollTop'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    showText: ["仅英文", "仅中文", "中英"],
    showMode: 0,
    classicBookInfo: {
      bookNameCn: "",
      bookNameEn: "",
      chapterCount: 0,
      chapter: [],
      chapterTitle: [],
      chapterTitleEN: [],
      _id: ""
    },
    isShowMenu: false,
    isShowCreateBookMark: false,
    isShowBookMark: false,
    chapterIndex: 0,
    position: 0,
    bookMasks: [],
    newBookMark: ""
  },

  // 上一章
  previewChapter() {
    const id = this.data.id
    const chapterIndex = this.data.chapterIndex - 1
    if (chapterIndex < 0) {
      // 提示是第一章
      Toast('当前为第一章');
      return
    }
    this.getClassicBookChapter(id, chapterIndex)
  },

  // 下一章
  nextChapter() {
    const id = this.data.id
    const chapterIndex = this.data.chapterIndex + 1
    const maxChapter = this.data.classicBookInfo.chapterCount - 1
    if (chapterIndex > maxChapter) {
      // 提示是最后一章
      Toast('当前为最后一章');
      return
    }
    this.getClassicBookChapter(id, chapterIndex)
  },

  changeMenu() {
    this.setData({
      isShowMenu: !this.data.isShowMenu,
    })
    if (this.data.isShowMenu) {
      this.setData({isShowBookMark: false})
    }
  },

  selectChapter(event) {
    const index = event.currentTarget.dataset.index
    const classicId = this.data.id
    this.getClassicBookChapter(classicId, index)
    this.setData({
      isShowMenu: !this.data.isShowMenu
    })
  },

  selectBookMask(event) {
    const index = event.currentTarget.dataset.index
    if (this.data.bookMasks[index].chapterIndex === this.data.chapterIndex) {
      this.setData({
        position: this.data.bookMasks[index].position.scrollTop,
        showMode: this.data.bookMasks[index].position.showMode
      })
    } else {
      const classicId = this.data.id
      const id = this.data.bookMasks[index].chapterIndex
      this.getClassicBookChapter(classicId, id)
    }
  },

  async addBookMarks() {
    const bookMasks = this.data.bookMasks
    const res = await getScrollTop("#reading")
    bookMasks.push({
      bookMasksTitle: this.data.newBookMark,
      chapterIndex: this.data.chapterIndex,
      position: {
        showMode: this.data.showMode,
        scrollTop: res[1].scrollTop
      }
    })
    this.setData({ 
      isShowCreateBookMark: false,
      newBookMark: "",
      bookMasks
    })
  },

  cancelBookMarks() {
    this.setData({
      isShowCreateBookMark: false,
      newBookMark: ""
    })
  },

  clickRightButton() {
    if (this.data.isShowMenu) {
      this.setData({
        isShowBookMark: !this.data.isShowBookMark
      })
    } else {
      this.setData({
        isShowCreateBookMark: true
      })
    }
  },

  changeNewBookMark(event) {
    this.setData({
      newBookMark: event.detail.value
    })
  },
  async getClassicBookChapter(classicId, index) {
    const res = await getContentByIndex(classicId, index)
    this.setData({
      classicBookInfo: res.classicBookInfo,
      chapterIndex: res.chapterIndex,
    })
  },

  async getClassicBookInfo(classicId, index) {
    // 请求书籍内容
    const res = await addClassicToLib(classicId, index)
    console.log(res)
    this.setData({
      classicBookInfo: res.classicBookInfo,
      chapterIndex: res.chapterIndex,
      bookMasks: res.bookMasks,
      position: res.position
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const id = options.id
    this.setData({
      id
    })
    await this.getClassicBookInfo(id, 0)
  },

  // 修改显示模式
  changeShowMode() {
    const index = Number.parseInt((this.data.showMode + 1) % 3)
    this.setData({
      showMode: index
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
    saveBookMasks(this.data.id, this.data.bookMasks).then((res) => {
      console.log(res)
    })
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