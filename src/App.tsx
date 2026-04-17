import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import routers from './router'
import Donwload from './views/download'
import { memo, Suspense } from 'react'
function App() {
  return (
    <div className="App">
      <div className="nav">
        <Link to="/discorver">发现</Link>
        <Link to="/mine">我的</Link>
        <Link to="/focus">我的关注</Link>
        <Link to="/download">下载</Link>
      </div>
      {/*suspense的作用就是对包裹的路由rou进行路由懒加载，只要是rou当中涉及的内容，只要还没加载完全就显示loading */}
      <Suspense fallback="....loading">
        <div className="rou"> {useRoutes(routers)}</div>
      </Suspense>
    </div>
  )
}

export default App
