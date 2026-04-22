import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { count } from 'console'
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 100,
    message: 'hello world',
    address: '成都'
  },
  reducers: {
    //可以设置payload的类型，其中泛型设定的是payload的类型。
    changeMessage(state, { payload }:PayloadAction<string>) {
      state.message = payload
    }
  }
})
export const { changeMessage } = counterSlice.actions
export default counterSlice.reducer
