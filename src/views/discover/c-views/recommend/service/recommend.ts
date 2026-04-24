import hyRequest from '@/service'
//对于banner接口进行导出，对于数据的获取和操作一般在store当中进行
export function getBanner() {
  //返回一个promise
  return hyRequest.get({
    url: '/banner'
  })
}
