import hyRequest from '@/service'
//对于banner接口进行导出，对于数据的获取和操作一般在store当中进行
export function getBanner() {
  //返回一个promise
  return hyRequest.get({
    url: '/banner'
  })
}
//limit传递参数最后会跟url拼接在一起，limit默认为30
export function getHotRecommend(limit = 30) {
  return hyRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}
export function getNewAlbum() {
  return hyRequest.get({
    url: '/album/newest'
  })
}
