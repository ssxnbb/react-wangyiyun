import React, { memo, useEffect, useState } from 'react'
import type { ReactNode, FC } from 'react'
import { useAppDispatch } from '@/store'
import hyRequest from '@/service'
import { fetchBannerData } from './store/recommend'
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
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBannerData())
  }, [])
  return <div>recommend</div>
}
export default memo(Recommend)
