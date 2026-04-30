import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { SongMenuItemwrap } from './style'
import { format_count, getImage } from '@/utils/format'
interface HotrecommedData {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  trackNumberUpdateTime: number
  playCount: number
  trackCount: number
  highQuality: boolean
  alg: string
}
interface IProps {
  children?: ReactNode
  itemdata?: HotrecommedData
}
//<IProps>默认将函数参数props设置为Iprops
const SongMenuItem: FC<IProps> = (props) => {
  const { itemdata } = props
  return (
    <SongMenuItemwrap>
      <div className="top">
        <img src={getImage(itemdata?.picUrl,140)} alt="" />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              <span className="count">{format_count(itemdata?.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="bottom">{itemdata?.name}</div>
    </SongMenuItemwrap>
  )
}
export default memo(SongMenuItem)
