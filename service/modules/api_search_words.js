import myRequest from '../index'
const jsonapi = "https://dict.youdao.com/jsonapi?jsonversion=2&q="
const suggest = "https://dict.youdao.com/suggest?le=eng&num=80&doctype=json&q="

// 查询单词
export function searchWords(word) {
  const url = jsonapi + word
  return myRequest.get(url)
}

export function iAssociate(word) {
  const url = suggest + word
  return myRequest.get(url)
}