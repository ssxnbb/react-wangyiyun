import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { NewAlbumItemWrapper } from './styled'
import { NewAlbum } from '@/views/discover/c-views/recommend/store/type'
import { getImage } from '@/utils/format'
interface IProps {
  children?: ReactNode
  ItemData?: NewAlbum
}
//<IProps>默认将函数参数props设置为Iprops
const NewAlbumItem: FC<IProps> = (props) => {
  const { ItemData } = props
  return (
    <NewAlbumItemWrapper>
      <div className="top">
        <img src={getImage(ItemData?.picUrl, 100)} alt={ItemData?.name} />
        <a href="" className="cover sprite_cover"></a>
      </div>
      <div className="bottom">
        <div className="name">{ItemData?.name}</div>
        <div className="artist">{ItemData?.artist.name}</div>
      </div>
    </NewAlbumItemWrapper>
  )
}
export default memo(NewAlbumItem)
