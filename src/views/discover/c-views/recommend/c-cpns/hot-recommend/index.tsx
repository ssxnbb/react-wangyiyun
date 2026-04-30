import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { HotRecommendWrap } from './style'
import AreaHeaderV1 from '@/component/area-header-v1'
import { fetchHotRecommendData } from '../../store/recommend'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import songMenuItem from '@/component/song-menu-item'
import SongMenuItem from '@/component/song-menu-item'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const HotRecommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchHotRecommendData())
  }, [])
  //从store当中拿到相应数据
  const { hotrecommend } = useAppSelector(
    (state) => ({
      hotrecommend: state.recommend.hotrecommend
    }),
    shallowEqual //做出一个浅比较，地址变值不变，不进行刷新。
  )
  return (
    <HotRecommendWrap>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        morelink="/discorver/songs"
      />
      <div className="hotrecommend">
        {hotrecommend.map((item, index) => {

            /* 不能直接插入item，因为item是一个对象，对象不能直接插入
              只能直接插入数字，字符串和数组 */
          // 将歌包装成为一个小组件，然后循环遍历返回这个组件
          //jsx传值的时候不能传递对象，即标签中间不能为对象，但是向子组件传值的时候可以传递对象
          return (<SongMenuItem key={item.id} itemdata={ item} />)
        })}
      </div>
    </HotRecommendWrap>
  )
}
export default memo(HotRecommend)
