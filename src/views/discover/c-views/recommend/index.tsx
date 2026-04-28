import React, { memo, useEffect, useState } from 'react'
import type { ReactNode, FC } from 'react'
import TopBanner from './c-cpns/top-banner'

interface IProps {
  children?: ReactNode
}
export interface BannerData {
  targetId: number
  bigImageUrl: string
  imageUrl: string
  targetType: number
  typeTitle: string
  s_ctrp: string
  url: string
}
//<IProps>默认将函数参数props设置为Iprops
const Recommend: FC<IProps> = () => {

  return (
      <TopBanner/>
  )
}
export default memo(Recommend)
