export function hasChinese(words) {
  const reg = /.*[\u4e00-\u9fa5]+.*$/
  if (reg.test(words)) {
    return true
  } else {
    return false
  }
}

export function disruptOrder(arr) {
  const randomNumber = function() {
    return 0.5 - Math.random()
  }
  arr.sort(randomNumber)
  return arr
}

export function randomletterNum(num, count) {
  const set = new Set()
  while(true) {
    const value = Number.parseInt(Math.random() * num)
    set.add(value)
    if (set.size === count) {
      return Array.from(set)
    }
  }
}