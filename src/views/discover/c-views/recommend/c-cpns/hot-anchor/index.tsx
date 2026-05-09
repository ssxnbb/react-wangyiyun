import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { AnchorWrapper } from './style'
import AreaHeaderV2 from '@/component/area-header-v2'
import { hotRadios } from '@/assets/data/local-data'
import { getImage } from '@/utils/format'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const HotAnchor: FC<IProps> = () => {
  return (
    <AnchorWrapper>
      <AreaHeaderV2 title="热门主播" />
      <div className="anchor-list">
        {hotRadios.map((item, index) => {
          return (
            <div className="item" key={index}>
              <a className="image">
                <img src={getImage(item.picUrl, 40)} alt="" />
              </a>
              <div className="info">
                <a href="" className="name">
                  {item.name}
                </a>
                <div className="position">{item.position}</div>
              </div>
            </div>
          )
        })}
      </div>
    </AnchorWrapper>
  )
}
export default memo(HotAnchor)
