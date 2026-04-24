//采用函数式组件
//必须引入react，看似没有使用react，其实在返回div组件的时候，默认进行React.createlement操作
import React, { memo, Suspense } from 'react'
import type { ReactNode, FC } from 'react'
import { Outlet, Link } from 'react-router-dom'
import NavBar from './c-cpns/nav-bar'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const Discorver: FC<IProps> = () => {
  return (
    <div>
      <NavBar/>
      {/* 为了避免二级路由内容加载的时候导致整体loading
      所以需要在二级路由当中设置suspense */}
      <Suspense fallback="loading">
        <Outlet />
      </Suspense>
    </div>
  )
}
export default memo(Discorver)
