import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const Template: FC<IProps> = () => {
  return <div>Template</div>
}
export default memo(Template)
