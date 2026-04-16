import { RouteObject } from 'react-router-dom'
//将路由数组元素类型设置未RouterObject保证写的时候会有提示
import Discorver from '@/views/dicorver'
import React from 'react'
const router: RouteObject[] = [
  {
    path: '/discorver',
    element: <Discorver />
  }
]
export default router
