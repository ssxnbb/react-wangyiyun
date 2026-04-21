// Local NeteaseCloudMusicApi service.
// React dev server commonly uses 3000, so use 4000 for the API service.
export const BASE_URL = 'http://127.0.0.1:4000'
//请求发出后如果超出10s就认为这个请求超时，进入失败回调
export const TIME_OUT = 10000
