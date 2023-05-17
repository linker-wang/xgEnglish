export function getScrollTop(selector, _this = null) {
  return new Promise((resolve) => {
    let query = null
    if(!_this){
      query = wx.createSelectorQuery()
    }else{
      query = wx.createSelectorQuery().in(_this)
    }
    query.select(selector).boundingClientRect()
    query.select(selector).scrollOffset()
    query.exec((res) => {
      resolve(res)
    })
  })
}