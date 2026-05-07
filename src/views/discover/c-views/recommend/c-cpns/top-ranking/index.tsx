import React, { memo, useEffect } from 'react'
import type { ReactNode, FC } from 'react'
import { ToprankingWrapper } from './style'
import AreaHeaderV1 from '@/component/area-header-v1'
import { useAppSelector, useAppDispatch } from '@/store'
import { fetchTopRankingData } from '../../store/recommend'
import { shallowEqual } from 'react-redux'
import topRankingItem from '../top-ranking-item'
import TopRankingItem from '../top-ranking-item'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const TopRanking: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTopRankingData())
  }, [])
  const { topRankings } = useAppSelector(
    (state) => ({
      topRankings: state.recommend.topRanking
    }),
    shallowEqual
  )
  return (
    <ToprankingWrapper>
      <AreaHeaderV1 title="榜单" morelink="/discorver/ranking" />
      <div className="content">
        {topRankings.map((item, index) => {
          return <TopRankingItem key={item.id} topRanking={item} />
        })}
      </div>
    </ToprankingWrapper>
  )
}
export default memo(TopRanking)
