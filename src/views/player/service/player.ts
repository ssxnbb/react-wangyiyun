import hyRequest from '@/service'
//根据id获取歌曲数据
export function getSongDetail(ids: number) {
  return hyRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}
