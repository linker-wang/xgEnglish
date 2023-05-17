// pages/word-detail/index.js
import { searchWords } from "../../service/modules/api_search_words"
import { richHandle } from "../../utils/js/richHandle"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordInfo: null
  },

  // 请求单词数据
  setWord: async function(word) {
    const res = await searchWords(word)
    console.log(res)
    const guessLanguage = res.meta.guessLanguage
    if (guessLanguage === "eng") {
      this.handleWordInfo(res)
    } else if(guessLanguage === "zh") {
      this.handleChineseInfo(res)
    }
  },

  // 英文数据处理
  handleWordInfo: function(res) {
    // 单词
    const word = res.simple.query ?? ""
    // 音标
    const usphone = res.simple.word[0].usphone ?? ""
    const ukphone = res.simple.word[0].ukphone ?? ""
    // 释义
    const meaningArr = res?.ec?.word[0]?.trs
    const meaning = []
    meaningArr?.forEach(element => {
      meaning.push(element.tr[0].l.i[0])
    });
    // 考试类型
    const exam_type = res?.ec?.exam_type
    const type = exam_type?.join(" / ") ?? ""
    // 双语例句
    const sentencePair = res?.blng_sents_part ? res?.blng_sents_part['sentence-pair'] : []
    const example = []
    sentencePair?.forEach(element => {
      example.push({
        sentence: element.sentence,
        translation: element['sentence-translation']
      })
    })
    // 近义词
    const similarWords = res?.ee?.word?.trs[0]?.similar_word
    const similar = []
    similarWords?.forEach(element => {
      similar.push(element.similar)
    })
    this.setData({
      wordInfo: {
        infoType: res.meta.guessLanguage,
        word,
        usphone,
        ukphone,
        meaning,
        type,
        example,
        similar
      }
    })
  },
  // 中文数据处理
  handleChineseInfo: function(res) {
    // 词语
    const word = res?.input ?? ""
    // 拼音
    const pinyin = res?.simple?.word[0]?.phone ?? ""
    // 释义
    const meaningArr = res?.ce?.word[0]?.trs ?? []
    const meaning_zh = []
    meaningArr.forEach(element => {
      const wordObj = {}
      wordObj.word = element.tr[0].l.i.reduce((preVaule, item) => {
        return preVaule + (item instanceof Object ? item['#text'] : item)
      }, "")
      wordObj.tran = element.tr[0].l['#tran']
      meaning_zh.push(wordObj)
    })
    // 例句
    const sentencePair = res?.blng_sents_part ? res?.blng_sents_part['sentence-pair'] : []
    const example = []
    sentencePair?.forEach(element => {
      example.push({
        sentence: element.sentence,
        translation: element['sentence-translation']
      })
    })
    // 网络释义
    const webArr = res.web_trans['web-translation']
    const web_trans = []
    webArr.forEach(element => {
      if (element['@same']) {
        element?.trans.forEach( item => {
          web_trans.push({
            word: item.value,
            summary: richHandle(item.summary.line[0])
          })
        })
      }
    })
    this.setData({
      wordInfo: {
        infoType: res.meta.guessLanguage,
        word,
        pinyin,
        meaning_zh,
        example,
        web_trans
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取传入的单词
    const word = options.word
    // 请求单词数据
    this.setWord(word)
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