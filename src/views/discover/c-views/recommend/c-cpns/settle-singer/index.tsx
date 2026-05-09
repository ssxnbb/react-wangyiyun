import React, { memo, useEffect } from 'react'
import type { ReactNode, FC } from 'react'
import { SettleWrapper } from './style'
import AreaHeaderV2 from '@/component/area-header-v2'
import { shallowEqual, useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchArtistData } from '../../store/recommend'
import { getImage } from '@/utils/format'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const SettleSinger: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchArtistData())
  }, [])
  //下面函数第一个参数是函数，最终要去返回一个对象，返回一个对象最外层要加上一个括号
  const { artists } = useAppSelector(
    (state) => ({
      artists: state.recommend.artists
    }),
    shallowEqual
  )
  return (
    <SettleWrapper>
      <AreaHeaderV2
        title="入驻歌手"
        more="查看更多"
        morePath="#/discorver/artist"
      />
      <div className="singer-list">
        {artists.map((item, index) => {
          return (
            <a href="/singer" key={item.id} className="item">
              <img src={getImage(item.img1v1Url, 62)} alt="" />
              <div className="info">
                <div className="singer">{item.name}</div>
                <div className="desc">{item.alias.join('') || item.name}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="">申请成为网易音乐人</a>
      </div>
    </SettleWrapper>
  )
}
export default memo(SettleSinger)
