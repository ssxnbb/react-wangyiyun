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
//下面这个是RKT的异步无监听函数，可以直接在这个异步函数当中进行异步操作
export const fetchBannerData = createAsyncThunk(
  'banner',//下面这个dispatch直接从固有的RKTAPI拿取，不用传值得到
  async (arg, { dispatch }) => {
    //await必须在异步函数当中使用,await后面必须跟一个promise
    //只有当promise被resolve或者reject的时候，才会去执行后面的代码
    //await返回值就是resolve的值，即res
    const res = await getBanner()
    console.log(res)
    dispatch(changeBannerAction(res.banners))
  }
)
interface IBanner {
  //接口的类型必须写成这种形式，即左边是变量名称，右侧是该变量的类型
  banners: BannerData[]
}
const initialState: IBanner = {
  //initialState设置为一个对象，banners是对象名称
  //[]是这个对象的初始值。这个数组当中的每个元素的类型就是BannerData
  banners: []
}
const banner_slice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    changeBannerAction(state, { payload }) {
      state.banners = payload
    }
  }
})
export const { changeBannerAction } = banner_slice.actions
export default banner_slice.reducer
