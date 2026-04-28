import React, { memo, use, useRef } from 'react'
import type { ReactNode, FC } from 'react'
import { BannerWrapper, BannerRight, BannerLeft, BannerControl } from './style'
import { Carousel } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import { useEffect, useState } from 'react'
import { fetchBannerData } from '../../store/recommend'
import { shallowEqual } from 'react-redux'
import type { CarouselRef } from 'antd/es/carousel'
//可以自动添加类的包
import classNames from 'classnames'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const TopBanner: FC<IProps> = () => {
  //使用useRef的时候必须先去获取类型，让系统知道这个ref什么类型，然后再去获取元素element
  const butref = useRef<CarouselRef>(null)
  const dispatch = useAppDispatch()
  //useState主要用于设置局部变量，如下所示
  const [cindex, setindex] = useState(0)
  //先去获取banner的数据，存储到全局的store当中的reducer集合
  useEffect(() => {
    dispatch(fetchBannerData())
  }, [])
  //selector主要是获取全局state当中的值，而useState主要是获取局部的值
  //最终返回一个对象，然后对对象进行解构。拿到数据
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.banner.banners
    }),
    shallowEqual //做出一个浅比较，地址变值不变，不进行刷新。
  )
  //下面方法为Carousel的固有方法，可以获取轮播图的当前索引
  function handleBeforeChange(current: number, next: number) {
    //在切换之前获取当前轮播图索引和下一张轮播图索引，然后获取下一张索引
    setindex(next)
  }
  //本质上调用Carousel自带的函数，所以需要先获取它本身的element
  function Button_handle_left() {
    //本质上为获取轮播图元素，然后调用轮播图方法
    butref.current?.prev()
  }
  function Button_handle_right() {
    butref.current?.next()
  }
  //直接在外面拼接模糊背景url，然后通过styled进行设置，每当轮播图切换都会重新渲染
  //然后获取新的背景图片
  let bgImageUrl = banners[cindex]?.imageUrl
  //网易云加上这个后缀直接变为模糊背景图片
  if (bgImageUrl) {
    bgImageUrl = bgImageUrl + '?imageView&blur=40x20'
  }
  return (
    <BannerWrapper
      style={{
        background: `url('${bgImageUrl}') center center / 6000px`
      }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          {/* 直接利用直接的API组件进行 */}
          <Carousel
            autoplay={true}
            effect={'fade'}
            ref={butref}
            beforeChange={handleBeforeChange}
            dots={false}
          >
            {banners.map((item) => {
              return (
                <div className="banner-item " key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          {/* 自定义设置指针小点 */}
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  {/* className用于方便的控制类名，item类名永远存在，{}当中包裹的是可以条件判断添加的类名 */}
                  <span className={classNames('item', { active: index === cindex })}>
                  </span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={Button_handle_left}></button>
          <button className="btn right" onClick={Button_handle_right}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}
export default memo(TopBanner)
