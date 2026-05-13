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
//获取歌词对应的promise
export function getSongLyric(id: number) {
  return hyRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}
