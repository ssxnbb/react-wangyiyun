export function getPlayerUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
//毫秒格式化
export function formatPlayerTime(time: number) {
  const totalSeconds = Math.floor(time / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const formatMinutes = String(minutes).padStart(2, '0')
  const formatSeconds = String(seconds).padStart(2, '0')

  return `${formatMinutes}:${formatSeconds}`
}
