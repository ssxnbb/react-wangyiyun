import React, { memo, useEffect, useState } from 'react'
import type { ReactNode, FC } from 'react'
import hyRequest from '@/service'
interface IProps {
  children?: ReactNode
}
export interface BannerData {
  targetId: number
  bigImageUrl: string
  imageUrl: string
  targetType: number
  typeTitle: string
  s_ctrp: string
  url: string
}
//<IProps>默认将函数参数props设置为Iprops
const Recommend: FC<IProps> = () => {
  //获取数据，并将数据格式设置为数组，数组中每个元素类型是BannerData
  const [banners, setBanners] = useState<BannerData[]>([])
  //测试网络请求，不能不用useEffect包裹，否则组件每渲染一次，都要发送一次网络请求
  useEffect(() => {
    hyRequest
      .get({
        url: '/banner'
      })
      .then((res) => {
        //res是很多数据的集合，你要选对你用的数据
        setBanners(res.banners)
      })
  }, [])
  return (
    <div>
      {/* jsx当中标签当中加函数，变量，表达式必须都放到{}当中 */}
      {banners.map((item, index) => {
        return <div key={index}>{item.imageUrl}</div>
      })}
    </div>
  )
}
export default memo(Recommend)
