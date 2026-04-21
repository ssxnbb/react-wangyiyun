import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
//这个文件用于创建实例对象
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})

export default hyRequest
