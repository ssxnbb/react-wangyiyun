import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { ToprankingItemWrapper } from './style'
import topRanking from '../top-ranking'
import { getImage } from '@/utils/format'
import { useAppDispatch } from '@/store'
import { fetchCurrentSongDataAction } from '@/views/player/store/player'
interface IProps {
  children?: ReactNode
  topRanking?: any
}
//<IProps>默认将函数参数props设置为Iprops
const ToprankingItem: FC<IProps> = (props) => {
  const dispatch = useAppDispatch()

  function handlePlayClick(id: number) {
    dispatch(fetchCurrentSongDataAction(id))
  }

  const { topRanking } = props
  const { tracks = [] } = topRanking
  return (
    <ToprankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImage(topRanking.coverImgUrl, 80)} alt="" />
          <a href="" className="image_cover"></a>
        </div>
        <div className="info">
          <a href="">{topRanking.name}</a>
          <div>
            <button className="btn play sprite_02"></button>
            <button className="btn favor sprite_02"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="list-item" key={item.id}>
              <div className="rank">{index + 1}</div>
              <div className="info">
                <span className="name text-nowrap">{item.name}</span>
                <div className="operate">
                  <button
                    className="btn sprite_02 play"
                    onClick={()=>handlePlayClick(item.id)}
                  ></button>
                  <button className="btn sprite_icon2 addto"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="/discorver/ranking">查看全部 &gt;</a>
      </div>
    </ToprankingItemWrapper>
  )
}
export default memo(ToprankingItem)
