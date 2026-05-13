interface ILyricLine {
  time: number
  text: string
}
//把歌词解析为一个个对象数组，包含时间和歌词
export function parseLyric(lyricString: string) {
  const lyrics: ILyricLine[] = []
  const lineStrings = lyricString.split('\n')
  //下面是捕获组正则表达式，\[这个是转义字符，因为[]在正则表达式上是有意思的
  const timeRegExp = /\[(\d+):(\d+)\.(\d+)\]/

  for (const line of lineStrings) {
    const result = timeRegExp.exec(line)
    if (!result) continue
    // result[0]是完整的匹配项，也就是整个匹配项
    //把字符串全部转化为数字
    const minute = Number(result[1])
    const second = Number(result[2])
    const millisecond = Number(result[3])
    //将时间全部转化为毫秒
    const time = minute * 60 * 1000 + second * 1000 + millisecond
    //将时间字符串全部替换为空字符串，然后去除字符串两头的空格，即可获得歌词文本
    const text = line.replace(timeRegExp, '').trim()
    //封装为一个对象push到数组当中。
    //这种写法本质是对象的增强，即变量名和属性名相同
    if (!text) continue
    lyrics.push({ time, text })
  }
  return lyrics
}
