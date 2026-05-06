import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getBanner, getHotRecommend, getNewAlbum } from '../service/recommend'
import { log } from 'console'
import { stat } from 'fs'
import { BannerData, HotrecommedData, NewAlbum } from './type'
export const fetchBannerData = createAsyncThunk(
  'banner', //下面这个dispatch直接从固有的RKTAPI拿取，不用传值得到
  async (arg, { dispatch }) => {
    //await必须在异步函数当中使用,await后面必须跟一个promise
    //只有当promise被resolve或者reject的时候，才会去执行后面的代码
    //await返回值就是resolve的值，即res
    const res = await getBanner()
    dispatch(changeBannerAction(res.banners))
  }
)
export const fetchHotRecommendData = createAsyncThunk(
  'hotrecommend',
  async (arg, { dispatch }) => {
    //调用这个函数的时候将limit的值设定为8
    const res = await getHotRecommend(8)
    dispatch(changeHotrecommendAction(res.result))
  }
)
//获取新碟上架数据
export const fetchNewAlbumData = createAsyncThunk(
  'newalbum',
  async (arg, { dispatch }) => {
    //调用这个函数的时候将limit的值设定为8
    const res = await getNewAlbum()
    dispatch(changeNewalbumAction(res.albums))
  }
)
interface Data {
  //接口的类型必须写成这种形式，即左边是变量名称，右侧是该变量的类型
  banners: BannerData[]
  hotrecommend: HotrecommedData[]
  newalbum: NewAlbum[]
}

const initialState: Data = {
  //initialState设置为一个对象，banners是对象名称
  //[]是这个对象的初始值。这个数组当中的每个元素的类型就是BannerData
  banners: [],
  hotrecommend: [],
  newalbum: []
}
const recommend_slice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    changeBannerAction(state, { payload }) {
      state.banners = payload
    },
    changeHotrecommendAction(state, { payload }) {
      state.hotrecommend = payload
    },
    changeNewalbumAction(state, { payload }) {
      state.newalbum = payload
    }
  }
})
export const {
  changeBannerAction,
  changeHotrecommendAction,
  changeNewalbumAction
} = recommend_slice.actions
export default recommend_slice.reducer
