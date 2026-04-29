import React, { memo, useEffect, useState } from 'react'
import type { ReactNode, FC } from 'react'
import TopBanner from './c-cpns/top-banner'
import { RecommendWrap } from './style'
import HotRecommend from './c-cpns/hot-recommend'

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
    <RecommendWrap>
      <TopBanner />
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend />
        </div>
        <div className="right">right</div>
      </div>
    </RecommendWrap>
  )
}
export default memo(Recommend)
