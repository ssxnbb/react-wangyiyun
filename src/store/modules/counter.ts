import { createSlice } from '@reduxjs/toolkit'
import { count } from 'console'
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 100,
    message: 'hello world',
    address: '成都'
  },
  reducers: {
    changeMessage(state, { payload }) {
      state.message = payload
    }
  }
})
export const { changeMessage } = counterSlice.actions
export default counterSlice.reducer
