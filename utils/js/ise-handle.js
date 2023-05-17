import CryptoJS from 'crypto-js'
import Toast from '@vant/weapp/toast/toast';
import {
  Base64
} from '../../service/modules/base64js'
import {
  DOMParser
} from 'xmldom'

const APPID = '6e8728ea'
const API_SECRET = 'YWFlZjgyYWM0ZDc0YmZjOTA3NzI3MDE5'
const API_KEY = 'a10eb9dcadf68f9d94c7b7fe7d6d3a67'

let audioData = []
let socketTask = null
let handlerInterval = null

// 初始化
const getWebSocketUrl = () => {
  return new Promise((resolve, reject) => {
    let url = "wss://ise-api.xfyun.cn/v2/open-ise"
    const host = "ise-api.xfyun.cn"
    const apiKey = API_KEY
    const apiSecret = API_SECRET
    const date = new Date().toGMTString()
    const algorithm = "hmac-sha256"
    const headers = "host date request-line"
    const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/open-ise HTTP/1.1`
    const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
    const signature = CryptoJS.enc.Base64.stringify(signatureSha)
    const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
    const authorization = Base64.encode(authorizationOrigin)
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
    resolve(url)
  })
}

// 录音
export const startVoiceRecord = (thisArg, word) => {
  const recorderManager = wx.getRecorderManager()
  recorderManager.onStart(() => {
    console.log('recorder start')
  })
  recorderManager.onPause(() => {
    console.log('recorder pause')
  })
  recorderManager.onStop((res) => {
    console.log('recorder stop', res)
    const {
      tempFilePath
    } = res

    startUpRecord(thisArg, word) //录音完成，准备调用讯飞接口
  })
  recorderManager.onFrameRecorded((res) => {
    const {
      frameBuffer
    } = res
    console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    let u8Arr = new Uint8Array(frameBuffer)
    audioData.push(u8Arr) //将每一帧的数据取出，放到audioData中，准备使用
  })
  return recorderManager
}

// 开始socket连接，准备上传数据并处理
const startUpRecord = async (thisArg, word) => {
  const url = await getWebSocketUrl()
  const _this = thisArg
  const newURL = encodeURI(url)
  socketTask = wx.connectSocket({
    url: newURL,
  })
  socketTask.onOpen(() => {
    console.log('打开了socket')
    _this.setData({
      show: true
    })
    webSocketSend(word)
  })
  socketTask.onMessage((e) => {
    // result 在这里做信息处理
    console.log('收到了结果：', e)
    result(e.data, thisArg)
  })
  socketTask.onError((err) => {
    //结束录音
    console.log('socket 出错：', err)
    _this.setData({
      show: false
    })
  })
  socketTask.onClose(() => {
    // 结束录音
    console.log('socket 关闭：')
    _this.setData({
      show: false
    })
  })
}

// 转base64
const toBase64 = (buffer) => {
  let binary = ""
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return Base64.btoa(binary)
}


const webSocketSend = (word) => {
  console.log('开始发送数据', audioData)
  let audioDataUp = audioData.splice(0, 1)
  const params = {
    common: {
      app_id: APPID,
    },
    business: {
      category: 'read_word', // read_syllable/单字朗读，汉语专有 read_word/词语朗读  read_sentence/句子朗读 https://www.xfyun.cn/doc/Ise/IseAPI.html#%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E6%B5%81%E7%A8%8B
      rstcd: 'utf8',
      group: 'pupil',
      sub: 'ise',
      ent: 'en_vip',
      tte: 'utf-8',
      cmd: 'ssb',
      auf: 'audio/L16;rate=16000',
      aus: 1,
      aue: 'raw',
      text: '\uFEFF' +
        `[word]
      ${word}`
    },
    data: {
      status: 0,
      encoding: 'raw',
      data_type: 1,
      data: toBase64(audioDataUp[0]),
    },
  }
  console.log(JSON.stringify(params))
  socketTask.send({
    data: JSON.stringify(params)
  })
  handlerInterval = setInterval(() => {
    // websocket未连接
    if (!socketTask) {
      clearInterval(handlerInterval)
      return
    }

    // 最后一帧
    if (audioData.length === 0) {
      console.log('数据发送完毕')
      socketTask.send({
        data: JSON.stringify({
          business: {
            cmd: 'auw',
            aus: 4,
            aue: 'raw'
          },
          data: {
            status: 2,
            encoding: 'raw',
            data_type: 1,
            data: '',
          },
        })
      })
      audioData = []
      clearInterval(handlerInterval)

      return false
    }
    audioDataUp = audioData.splice(0, 1)

    // 中间帧
    console.log('audioDataUp:', audioDataUp[0])
    socketTask.send({
      data: JSON.stringify({
        business: {
          cmd: 'auw',
          aus: 2,
          aue: 'raw'
        },
        data: {
          status: 1,
          encoding: 'raw',
          data_type: 1,
          data: toBase64(audioDataUp[0]),
        },
      })
    })
  }, 40)
}

const result = (resultData, thisArg) => {
  // 识别结束
  let jsonData = JSON.parse(resultData)
  if (jsonData.data && jsonData.data.data) {
    let data = Base64.decode(jsonData.data.data)
    const doc = new DOMParser().parseFromString(data, 'text/xml');
    let word = doc.getElementsByTagName('read_word')[1]

    if (jsonData.data.status === 2) {
      let total_score = Number(word.getAttribute('total_score')).toFixed(2) //总分
      let is_rejected = word.getAttribute('is_rejected')
      if (is_rejected === "true") {
        Toast('没听清楚，请重新再试！')
      } else {
        let allScore = thisArg.data.allScore
        let finalScore = 0
        let faildCount = thisArg.data.faildCount
        if (total_score >= 4) {
          finalScore = 5
          allScore += finalScore
        } else if (total_score >= 3) {
          finalScore = 4
          allScore += finalScore
        } else if (total_score >= 2.5) {
          finalScore = 3
          allScore += finalScore
        } else if (total_score >= 1.5) {
          finalScore = 2
          allScore += finalScore
          faildCount++
        } else {
          finalScore = 1
          allScore += finalScore
          faildCount++
        }
        const score = {
          total_score: finalScore,
          is_rejected,
        }
        thisArg.setData({
          score,
          allScore,
          faildCount,
          allRecordCount: thisArg.data.allRecordCount + 1
        })
      }
    }

    //评测结果在这里，就出来了，然后就可以拿评测数据去使用了
  }

  if (jsonData.code === 0 && jsonData.data.status === 2) {
    // 在这里结束socket
    socketTask.close()
  }
  if (jsonData.code !== 0) {
    socketTask.close()
    console.log(`${jsonData.code}:${jsonData.message}`)
  }
}