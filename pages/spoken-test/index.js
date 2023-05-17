// pages/spoken-test/index.js
import { getWordInfo } from '../../service/modules/api_word_book_list'
import { startVoiceRecord } from '../../utils/js/ise-handle'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: {},
    startIndex: 0,
    recorderManager: null,
    speakDefault: "按住发音",
    isSpeaking: false,
    tip: [
      "发音不太标准，再试试",
      "好可惜，再试一下吧",
      "还不错！",
      "你的发音太标准了！",
      "哇！你真是太厉害了！"
    ],
    faildCount: 0,
    count: 1,
    speakTimer: null,
    score: null,
    show: false,
    allScore: 0
  },

  async setWordInfo() {
    const wordBookName = this.data.bookInfo.bookName
    const planCount = this.data.bookInfo.planCount
    const startIndex = this.data.startIndex
    if (startIndex >= planCount) {
      // 完成计划
      wx.redirectTo({
        url: '../result-page/index',
      })
    }
    const res = await getWordInfo(wordBookName, startIndex)
    const recorderManager = startVoiceRecord(this, res.wordInfo.word.word)
    this.setData({
      wordInfo: res.wordInfo,
      startIndex: this.data.startIndex + 1,
      recorderManager: recorderManager,
    })
  },

  // 开始录音
  startRecord() {
    const options = {
      duration: 180000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 44100,
      frameSize: 2,
      format: 'pcm',
    }
    const recorderManager = this.data.recorderManager
    recorderManager.start(options)
    const speakTimer = setInterval(() => {
      this.setData({
        count: (this.data.count + 1) % 4 === 0 ? 1 : (this.data.count + 1) % 4
      })
    }, 500)
    this.setData({
      speakDefault: "发音中",
      isSpeaking: true,
      speakTimer: speakTimer
    })

  },
  // 停止录音
  endRecord() {
    clearInterval(this.data.speakTimer)
    const recorderManager = this.data.recorderManager
    recorderManager.stop()
    this.setData({
      speakDefault: "按住发音",
      isSpeaking: false,
      count: 1
    })
  },

  nextWord() {
    this.setWordInfo()
    this.setData({
      score: null,
      faildCount: 0
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
      startIndex
    })
    this.setWordInfo(bookInfo, startIndex)
  },
})