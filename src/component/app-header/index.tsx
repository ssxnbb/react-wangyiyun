import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HeaderLeft, HeaderWrapper, HeaderRight } from './style'
import header_title from '@/assets/data/header_titles.json'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const AppHeader: FC<IProps> = () => {
  //为了不让return过于显的臃肿，需要将复杂部分抽离成一个函数
  function showItem(item: any) {
    if (item.type === 'path') {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return <a href={item.link}>{item.title}</a>
    }
  }
  return (
    //HeaderWrapper只是起到一个css的作用
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          {/* logo这个css类是一个双类选择器
        （相当于两个类叠在一起），sprite_01是一个单类选择器，
        所以logo优先级更高，它的background position会覆盖spirite_01的
         从而保证精灵图正确显示*/}
          <a className="logo sprite_01" href="/">
            网易云音乐图标
          </a>
          {/* 对于数组遍历不能直接写，必须通过插值法插入到标签当中 */}
          <div className="title-list">
            {header_title.map((item, index) => {
              return (
                <div className="item" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
          />
          <span className="center">创作者中心</span>
          <span className="login">登录</span>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}
export default memo(AppHeader)
