import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const Album: FC<IProps> = () => {
  return <div>album</div>
}
export default memo(Album)
