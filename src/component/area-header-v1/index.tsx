import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { Headerv1wrap } from './style'
import { Link } from 'react-router-dom'
//这个组件是通用组件，所以需要给它设定参数
interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moretitle?: string
  morelink?: string
}
//<IProps>默认将函数参数props设置为Iprops
const AreaHeaderv1: FC<IProps> = (props) => {
  const {
    //对象解构并设置默认值
    title = '默认标题',
    keywords = [],
    moretitle = '更多',
    morelink = '/'
  } = props
  return (
    <Headerv1wrap className="sprite_02">
      <div className="left">
        <div className="title">{title}</div>
        <div className="keywords">
          {keywords.map((item, index) => {
            return (
              <div className="item" key={index}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link className="more" to={morelink}>
          {moretitle}
        </Link>
        <i className="sprite_02 icon"></i>
      </div>
    </Headerv1wrap>
  )
}
export default memo(AreaHeaderv1)
