export const format_count = (count: any) => {
  if (count > 100000) {
    count = Math.floor(count / 10000) + '万'
  }
  return count
}
export const getImage = (imageUrl: any, width: any, height: any = width) => {
  return imageUrl + `param?${width}y${height}`
}
