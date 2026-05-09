import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderV2Wrapper } from './style'

interface IProps {
  children?: ReactNode
  title: string
  more?: string
  morePath?: string
}

const AreaHeaderV2: FC<IProps> = (props) => {
  const { title='默认标题', more, morePath } = props

  return (
    <HeaderV2Wrapper>
      <h3 className="title">{title}</h3>
      {/* 因为有的标题是没有这个后置链接的，所以只有有值的时候才去显示后置链接 */}
      {more && morePath && <a href={morePath}>{more} &gt;</a>}
    </HeaderV2Wrapper>
  )
}

export default memo(AreaHeaderV2)
