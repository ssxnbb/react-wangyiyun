import React, { memo, useRef, useEffect } from 'react'
import type { ReactNode, FC } from 'react'
import { NewalbumWrapper } from './style'
import areaHeaderV1 from '@/component/area-header-v1'
import AreaHeaderV1 from '@/component/area-header-v1'
import { Carousel } from 'antd'
import type { CarouselRef } from 'antd/es/carousel'
import { useAppSelector, useAppDispatch } from '@/store'
import { shallowEqual } from 'react-redux'
import { fetchNewAlbumData } from '../../store/recommend'
import NewAlbumItem from '@/component/new-album-item'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const Newalbum: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  //先去执行useEffect，每次渲染只去执行一次，然后直接把数据存储到store当中
  useEffect(() => {
    dispatch(fetchNewAlbumData())
  }, [])
  //从store当中拿到相应数据
  const { newalbum } = useAppSelector(
    (state) => ({
      newalbum: state.recommend.newalbum
    }),
    shallowEqual //做出一个浅比较，地址变值不变，不进行刷新。
  )
  //获取这个轮播图的元素
  const butref = useRef<CarouselRef>(null)
  function handle_pre() {
    butref.current?.prev()
  }
  function handle_next() {
    butref.current?.next()
  }
  return (
    <NewalbumWrapper>
      <AreaHeaderV1 title="新碟上架" morelink="/discorver/album" />
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handle_pre}
        ></button>
        <div className="banner">
          <Carousel ref={butref} speed={1000}>
            {/* 最外层的map主要是为了进行分页处理 */}
            {[0, 1].map((item, index) => {
              return (
                // 一定要在最外层裹一层div，因为carousel会给最外层标签施加一层样式
                //所以在最外层加个标签去抵消这个样式
                <div className="item" key={index}>
                  <div className="album-list">
                    {newalbum
                      .slice(item * 5, (item + 1) * 5)
                      .map((item, index) => {
                        return <NewAlbumItem key={item.id} ItemData={item} />
                      })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handle_next}
        ></button>
      </div>
    </NewalbumWrapper>
  )
}
export default memo(Newalbum)
