import React from 'react'
import { useRoutes } from 'react-router-dom'
import routers from './router'
import Donwload from './views/download'
import { memo } from 'react'
function App() {
  return (
    <div className="App">
      <Donwload name="ssx" age={18}>
        <div>111</div>
        <span>hhh</span>
      </Donwload>
      <div className="rou"> {useRoutes(routers)}</div>
    </div>
  )
}

export default App
