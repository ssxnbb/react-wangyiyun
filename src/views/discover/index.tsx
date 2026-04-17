//采用函数式组件
//必须引入react，看似没有使用react，其实在返回div组件的时候，默认进行React.createlement操作
import React, { memo, Suspense } from 'react'
import type { ReactNode, FC } from 'react'
import { Outlet, Link } from 'react-router-dom'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const Discorver: FC<IProps> = () => {
  return (
    <div>
      <div>
        <Link to="/discorver/recommend">推荐</Link>
        <Link to="/discorver/ranking">排行榜</Link>
        <Link to="/discorver/songs">歌单</Link>
        <Link to="/discorver/djradio">主播电台</Link>
        <Link to="/discorver/artist">歌手</Link>
        <Link to="/discorver/album">新碟上架</Link>
      </div>
      {/* 为了避免二级路由内容加载的时候导致整体loading
      所以需要在二级路由当中设置suspense */}
      <Suspense fallback="loading">
        <Outlet />
      </Suspense>
    </div>
  )
}
export default memo(Discorver)
