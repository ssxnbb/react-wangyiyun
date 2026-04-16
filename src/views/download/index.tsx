import React, { memo } from 'react'
//导入类型和导入变量要分开写，类型前面加上type变量
import type { ReactNode } from 'react'
interface IPerson {
  children?: ReactNode
  name: string
  age: number
  height?: number
}
//比起给参数加上类型，可以直接给函数类型赋值为react函数式组件，这个后面的泛型是直接定义
//props这个参数的。它的优势在于Donwload不再是一个普通的函数，而是一个react函数式组件
//拥有函数式组件的各种性质
const Donwload: React.FC<IPerson> = (props) => {
  return (
    <div>
      <div>name:{props.name}</div>
      <div>age:{props.age}</div>
      <div>height:{props.height}</div>
      <div>{props.children}</div>
    </div>
  )
}
//react函数式组件可以设置displayName表示这个组件在浏览器上显示的名称，默认使用自己的名称Donwload
Donwload.displayName = '哈哈哈'

export default memo(Donwload)
