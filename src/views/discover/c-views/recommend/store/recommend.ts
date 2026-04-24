import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getBanner } from '../service/recommend'
import { log } from 'console'
interface BannerData {
  targetId: number
  bigImageUrl: string
  imageUrl: string
  targetType: number
  typeTitle: string
  s_ctrp: string
  url: string
}
export const fetchBannerData = createAsyncThunk('banner', async () => {
  //await必须在异步函数当中使用,await后面必须跟一个promise
  //只有当promise被resolve或者reject的时候，才会去执行后面的代码
  //await返回值就是resolve的值，即res
  const res = await getBanner()
  console.log(res)
  return res
})
const initialState: BannerData[] = []
const banner_slice = createSlice({
  name: 'banner',
  initialState,
  reducers: {}
})
export default banner_slice.reducer
