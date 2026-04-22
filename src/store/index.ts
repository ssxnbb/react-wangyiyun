import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'
import { TypedUseSelectorHook } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
//createSlice相当于局部数据库，store相当于总体数据库，
// 把局部数据库存入整体数据库
const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
//const state = store.getState()
//type StateType = typeof state，这两个方法也可以给useAppSelector设置类型
// 1. 获取 store 实例的 getState 方法的类型
type GetStateFnType = typeof store.getState

// 2. 利用 ReturnType 提取出 state 的具体结构类型
type IRootState = ReturnType<GetStateFnType>

// 3. 获取 store 实例的 dispatch 方法的类型
type DispatchType = typeof store.dispatch

// useAppSelector的hook
// 4. 创建并导出一个类型安全的自定义 Hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

// 5. 创建并导出一个类型安全的自定义 Hook (注意：这里写法略有不同，通常建议用泛型)
export const useAppDispatch: () => DispatchType = useDispatch
export default store
