import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { HotRecommendWrap } from './style'
import AreaHeaderV1 from '@/component/area-header-v1'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const HotRecommend: FC<IProps> = () => {
  return (
    <HotRecommendWrap>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        morelink="/discorver/songs"
      />
      <div>HotRecommend</div>
    </HotRecommendWrap>
  )
}
export default memo(HotRecommend)
