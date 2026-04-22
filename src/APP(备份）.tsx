import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import routers from './router'
import Donwload from './views/download'
import { memo, Suspense } from 'react'
import store from './store'
import { useSelector, useDispatch } from 'react-redux'
//默认导出可以不用在乎变量名称，但是普通导出必须在花括号上写上导出时候的名字
import { useAppDispatch, useAppSelector } from './store'
import { changeMessage } from './store/modules/counter'
import AppHeader from './component/app-header'
import AppFooter from './component/app-footer'
function App() {
  //返回对象的时候必须在最外层再加上一个大括号（）。
  //state不能是any类型，不然不方便提示词的出现
  //所以需要去获取state的类型
  //先获取getState函数的类型，再去获取返回值类型即为state类型,现在把他放到store当中直接导出
  // type state_type = typeof store.getState
  // type IRootState = ReturnType<state_type>
  const dispatch = useAppDispatch()
  function changeM() {
    dispatch(changeMessage('hahaha'))
  }
  const { count, address, message } = useAppSelector((state) => ({
    count: state.counter.count,
    address: state.counter.address,
    message: state.counter.message
  }))
  return (
    <div className="App">
      <AppHeader />
      {/*suspense的作用就是对包裹的路由rou进行路由懒加载，只要是rou当中涉及的内容，只要还没加载完全就显示loading */}
      <Suspense fallback="....loading">
        <div className="rou"> {useRoutes(routers)}</div>
      </Suspense>
      <h1>数量为：{count}</h1>
      <h1>地址为：{address}</h1>
      <h1>信息为：{message}</h1>
      <button onClick={changeM}>改变消息</button>
      <AppFooter />
    </div>
  )
}

export default App
